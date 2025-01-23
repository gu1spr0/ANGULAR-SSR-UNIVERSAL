import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { ValidateResponse } from "../interface/validate-response.interface";
import { VarApis } from "../settings/var.api";
import { ScannerResponse } from "../interface/scanner/scanner-response.interface";

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    constructor(private http: HttpClient){
    }

    scanDocument() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json' // Indicar que el body es texto plano
        });

        const data = {
            key: 'scan,test'
        }
        return this.http.post<ScannerResponse>(VarApis.OP_EXECUTE, data, { headers })
            .pipe(
                map((response: ScannerResponse) => {
                    if (!response) {
                        throw new Error('No existe respuesta válid');
                    }
                    return response;
                })
            );
    }
}