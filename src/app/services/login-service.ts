import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class LoginService {
    private url = '/usuarios/login';
    constructor(private http: HttpClient) { }

    login(credenciales: any): Observable<any> {
        console.log("login", JSON.stringify(credenciales))
        return this.http.post<any>(this.url, JSON.stringify(credenciales), httpOptions);
    }
}
