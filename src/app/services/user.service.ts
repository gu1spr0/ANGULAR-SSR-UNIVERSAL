import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { ValidateResponse } from "../interface/validate-response.interface";
import { VarApis } from "../settings/var.api";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient){
    }

    validateToken() {
        return this.http.post<ValidateResponse>(VarApis.OP_VALIDATE, null)
            .pipe(
                tap((response: ValidateResponse) => {
                    response
                }),
                map((response) => {
                    (response)
                })
            );
    }
}