import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class ProyectosService {
  private url = '/proyectos';
  constructor(private http: HttpClient) {}

  getProyectos(credenciales: any): Observable<any> {
    console.log('login', JSON.stringify(credenciales));
    return this.http.post<any>(this.url, JSON.stringify(credenciales), httpOptions);
  }

  getProyectosUsuarios(idproyecto: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + idproyecto + '/usuarios', httpOptions);
  }

  getProyectosUsuariosRoles(): Observable<any> {
    return this.http.get<any>(this.url + '/usuarios/roles', httpOptions);
  }
  crearProyecto(data: any): Observable<any> {
    return this.http.post<any>(this.url, JSON.stringify(data), httpOptions);
  }
}
