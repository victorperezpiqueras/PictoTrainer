import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class UsuariosService {
  private url = '/usuarios';
  constructor(private http: HttpClient) {}

  getSecuenciasAcciones(idusuario: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + idusuario + '/secuencias/acciones', httpOptions);
  }

  crearSecuencia(data: any): Observable<any> {
    return this.http.post<any>(
      this.url + '/' + data.idusuario + '/secuencias',
      JSON.stringify(data.secuencia),
      httpOptions
    );
  }
}
