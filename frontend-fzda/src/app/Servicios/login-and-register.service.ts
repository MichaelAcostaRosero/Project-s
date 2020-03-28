import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
const headers = new HttpHeaders ({'ContentType' : 'application/json'})

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {
  uri:'http://localhost:8000/'; 

  constructor(private http:HttpClient) {
    // let nombre='ernando';
    // let correo='fzhunio@ug.edu';
    // let pass='fernando';
    // let passConfirm="fernando";
    // let data_send = {'name':nombre,'email':correo,'password':pass,'password_confirmation':passConfirm};

    this.http.get(`https://restcountries.eu/rest/v2/all?fields=name`).subscribe(data=>{
      console.log(data);
     }/* ,error=>console.log(error) */
     );

   }
  Login(data):Observable<any>
  {
    return this.http.post(this.uri,data);
  }
  Register(data)
  {
    return this.http.post(`${this.uri}register`,data,{ 'headers': headers });
  }

}