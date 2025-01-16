import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VarLocalStorage } from '../settings/var.storage';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token desde el servicio de autenticación o localStorage
    // let id = localStorage.getItem(VarLocalStorage.KIOSK_ID);
    // let token = localStorage.getItem(VarLocalStorage.KIOSK_TOKEN);

    let id = 57;
    let token = '988664cc-6e32-45da-9367-34e17228518d';

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
