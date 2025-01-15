import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  {
    path: '**', // Ruta comodín para no encontrar
    component: PanelComponent // Componente de 404 o página de error
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
