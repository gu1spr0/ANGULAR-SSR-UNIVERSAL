import { Component, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/services/haeder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent {
  headers: Record<string, string | string[]> | null = null;
  isEnabled: boolean = false;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headers = this.headerService.getHeaders();
    if (!this.headers) {
      Swal.fire("No existen datos del header.");
      return;
    }
    const bisaCrdential = this.headers['x-bisa-self-service'];
    if (!bisaCrdential) {
      Swal.fire("Datos de autenticación no presente en el header.");
      return;
    }
    
    this.isEnabled = true;
    const userAgent = this.headers['user-agent']; // Ejemplo de acceso a una cabecera específica
    console.log('User-Agent:', userAgent);
  }

  OpenCamera() {
    console.log("Camaria iniciada");
  }
}
