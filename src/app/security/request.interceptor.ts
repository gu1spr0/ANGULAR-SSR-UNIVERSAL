import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VarLocalStorage } from '../settings/var.storage';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token desde el servicio de autenticación o localStorage
    let id = localStorage.getItem(VarLocalStorage.KIOSK_ID);
    let token = localStorage.getItem(VarLocalStorage.KIOSK_TOKEN);

    //let id = 69;
    //let token = '2c489abb-0033-4aeb-9923-d3b70e70ee55';

    // Si el token existe, agrega el header Authorization
    if (id && token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `${id} ${token}`
        }
      });
      return next.handle(cloned);
    }
    // Si no hay token, continúa con la solicitud sin modificarla
    return next.handle(req);
  }
}
