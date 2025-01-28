import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CredentialData } from 'src/app/interface/credential-data.interface';
import { ScannerResponse } from 'src/app/interface/scanner/scanner-response.interface';
import { ValidateDataResponse } from 'src/app/interface/validate-data.interface';
import { ValidateResponse } from 'src/app/interface/validate-response.interface';
import { DeviceService } from 'src/app/services/device.service';
import { HeaderService } from 'src/app/services/haeder.service';
import { UserService } from 'src/app/services/user.service';
import { VarLocalStorage } from 'src/app/settings/var.storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent {
  headers: Record<string, string | string[]> | null = null;
  isEnabled: boolean = false;
  showCamera: boolean = true;
  validateResponse: ValidateResponse | undefined;
  scannerResponse: ScannerResponse | undefined;
  image: string = '';
  showImage: boolean = false;

  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  private stream: MediaStream | null = null;

  credential: CredentialData = { 
    service: '-',
    id: 0,
    token: '-'
  }
  constructor(private headerService: HeaderService,
              private userService: UserService,
              private deviceService: DeviceService,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.headers = this.headerService.getHeaders();
    if (!this.headers) {
      Swal.fire("No existen datos del header.");
      return;
    }
    let bisaCredential: any = this.headers['x-bisa-self-service'];
    if (!bisaCredential) {
      Swal.fire("Datos de autenticación no presente en el header.");
      return;
    }

    this.credential = JSON.parse(bisaCredential);
    localStorage.setItem(VarLocalStorage.KIOSK_ID, this.credential.id.toString());
    localStorage.setItem(VarLocalStorage.KIOSK_TOKEN, this.credential.token);
    this.isEnabled = true;
  }

  initValidate() {
    this.showCamera = false;
    this.showImage = false;
    this.userService.validateToken().subscribe({
      next: (response: ValidateResponse) => {
        this.validateResponse = response;
      },
      error: (error) => {
        Swal.fire(error);
      },
      complete: () => {
        Swal.fire({
          title: "Solicitud de datos completado",
          icon: 'success'
        });
      }
    });
  }

  initScanner() {
    this.showImage = true;
    this.isEnabled = false;
    this.showCamera = false;
    this.deviceService.scanDocument().subscribe({
      next: (response: ScannerResponse) => {
        this.scannerResponse = response;
      },
      error: (error) => {
        Swal.fire(error);
      },
      complete: () => {
        Swal.fire({
          title: "Escaneo de documento realizado",
          icon: 'success'
        });

        this.image = `data:image/png;base64,${this.scannerResponse?.data}`
      }
    });
  }

  initSignpad() {

  }

  async initCamera(): Promise<void> {
    this.showCamera = true;
    if (!this.isEnabled)
      return;
    try {
      const constraints = {
        video: true,
      }
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    }
    catch (error) {
      Swal.fire("Ocurrio un error con la cámara: " + error);
    }
  }

  initDispenser() {

  }

  async closeView() {
    if (isPlatformBrowser(this.platformId)) {
      console.log("Enviando mensaje...");
      await (window as any).CefSharp.BindObjectAsync('message');
      (window as any).message.Greeting("Israel");
    }
    /*if (isPlatformBrowser(this.platformId)) {
      const reactNativeWebView = (window as any).ReactNativeWebView;

      if (reactNativeWebView) {
        reactNativeWebView.postMessage('CLOSE');
      } else {
        console.warn('ReactNativeWebView no está disponible en el navegador.');
      }
    } else {
      console.warn('El código se está ejecutando en el servidor, no en el navegador.');
    }*/
  }
}
