import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private htpp:HttpClient) { }
  url:'http://localhost:8000'
  Login(data):Observable<any>
  {
    return this.htpp.post(this.url,data);
  }
  Register(data):Observable<any>
  {
    return this.htpp.post(this.url,data);
  }

}