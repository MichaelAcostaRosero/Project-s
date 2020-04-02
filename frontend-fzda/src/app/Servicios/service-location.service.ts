import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocationService {

  constructor(private http:HttpClient) {}

  getCountrys(data:string)
  {
    // return this.http.get('https://restcountries.eu/rest/v2/all?fields=name');
      let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?types=address&access_token=${environment.mapbox_key}`;
    return  this.http.get(url).pipe(map((item:any) => {
        return item.features
      }))
  
    
  }
}