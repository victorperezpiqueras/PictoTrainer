import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class SecuenciaService {
  private url = '/secuencias';
  constructor(private http: HttpClient) {}

  getSecuenciasUsuario(idusuario: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + idusuario, httpOptions);
  }

  crearSecuenciaUsuario(secuencia: any): Observable<any> {
    console.log(secuencia);
    return this.http.post<any>(this.url, secuencia, httpOptions);
  }

  borrarSecuencia(idsecuencia: any): Observable<any> {
    return this.http.delete<any>(this.url + '/' + idsecuencia, httpOptions);
  }
}
