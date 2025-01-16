import { Component, ElementRef, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CredentialData } from 'src/app/interface/credential-data.interface';
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

  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  private stream: MediaStream | null = null;

  credential: CredentialData = { 
    service: '-',
    id: 0,
    token: '-'
  }
  constructor(private headerService: HeaderService,
              private userService: UserService
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
    this.userService.validateToken().subscribe(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(error);
      }
    );
  }

  initScanner() {

  }

  initSignpad() {

  }

  async initCamera(): Promise<void> {
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
}
