import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// const headers = new HttpHeaders ({'ContentType' : 'application/json'})
// const headers = new HttpHeaders ({'Content-Type' : 'multipart/form-data'})

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {
  uri ='http://localhost:8000/api/'; 

  constructor(private http:HttpClient) {
    // let nombre='ernando';
    // let correo='fzhunio@ug.edu';
    // let pass='fernando';
    // let passConfirm="fernando";
    // let data_send = {'name':nombre,'email':correo,'password':pass,'password_confirmation':passConfirm};
    let names = "Nombre";
    let correo = "Correo";
    let clave = "Clave";
    let claveConfirm = "ClaveConfirm";
    let direccion = "Direccion";
    let isLocal = "IsLocal";
    let descripcion = "Descripcion";

   }
 
  Login(data):Observable<any>
  {
    return this.http.post(this.uri,data);
  }
  Register(data,logo)
  {
    const img = new FormData();
    img.append('image',logo,logo.name);
    console.log({data,'logo':img});
    // return this.http.post(`${this.uri}register`,{data,'logo':img},{ 'headers': headers });
  }

  RegisterTest(logo)
  {
    const img = new FormData();
    console.log(logo);
    
    img.append('logo',logo,logo.name);
    // img.append('name',"Fernando")
    // img.append('email', "fzhunio91@hotma,.com")
    // img.append('password',"fer")
    // img.append('password_confirm',"fer")
    // img.append('address', "Guayanas, Rengo, Libertador General Bernardo OHiggins 29400, Chile")
    // img.append('local', '0');
    // img.append('descripcion',"cosas")
    // img.append,logo':img)
    // img.append('trabajos',JSON.stringify({'trabajo':"fernando"}))
    // img.append('contactos', JSON.stringify([
    //   {'icon': "fab fa-null", 'contacto': "ww.face.com"},
    //   {'icon': "fab fa-facebook", 'contacto': "www.facebook.com"}
    // ]))
    
    img.append('name',"Fernando");
    img.append('email', "fzhunio91@hotma.com");
    img.append('password','fer');
    img.append('address','"Guayanas, Rengo, Libertador General Bernardo OHiggins 29400, Chile"');
    img.append('local','0');
    img.append('descripcion','cosas');
    img.append('trabajos','fer');
    img.append('contactos','fer');
    // img.append('password','fer');
    let data ={
    'name':"Fernando",
    'email': "fzhunio91@hotma,.com",
    'password':"fer",
    'password_confirm':"fer",
    'address': "Guayanas, Rengo, Libertador General Bernardo OHiggins 29400, Chile",
    'local': '0',
    'descripcion':"cosas",
    
    'trabajos':{'trabajo':"fernando"},
    'contactos': [
      {'icon': "fab fa-null", 'contacto': "ww.face.com"},
      {'icon': "fab fa-facebook", 'contacto': "www.facebook.com"}
    ]
    }
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json')
      
    console.log({data,img});
    return this.http.post(`${this.uri}register`,img,{ 'headers': headers });
  } 
}