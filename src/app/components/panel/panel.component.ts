import { Component, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/services/haeder.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent {
  headers: Record<string, string | string[]> | null = null;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headers = this.headerService.getHeaders();
    if (this.headers) {
      const userAgent = this.headers['user-agent']; // Ejemplo de acceso a una cabecera específica
      console.log('User-Agent:', userAgent);
      return;
    }
    console.log("Header no encontrado");
  }

  OpenCamera() {
    console.log("Camaria iniciada");
  }
}
