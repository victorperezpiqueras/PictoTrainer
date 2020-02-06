import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class HolaMundoService {
  private url = '/holamundo/';
  constructor(private http: HttpClient) {}

  getHolaMundo(): Observable<any> {
    return this.http.get<any>(this.url, httpOptions);
  }
}
