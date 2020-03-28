import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceLocationService {

  constructor(private http:HttpClient) {}

  getCountrys()
  {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name');
  }
}