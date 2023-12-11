import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = 'IxkMqohRwCUeimGg4XfH031AZn0wiVdtSwAbbf2f'; // Reemplaza con tu clave de API

  constructor(private http : HttpClient) { }

  getApod(): Observable<any> {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
