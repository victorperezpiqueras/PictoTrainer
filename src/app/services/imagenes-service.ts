import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class ImagenService {
  private url = '/imagenes';
  constructor(private http: HttpClient) {}

  buscarImagen(palabra: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + palabra, httpOptions);
  }

  subirImagen(image: any): Observable<any> {
    console.log(image);
    return this.http.post<any>(this.url, image, httpOptions);
  }
}
