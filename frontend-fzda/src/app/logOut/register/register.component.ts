import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { MatSnackBar, MatDialog } from "@angular/material";
import { LoginAndRegisterService } from "../../Servicios/login-and-register.service";
import { ServiceLocationService } from "../../Servicios/service-location.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ButtonShettRegisterContactComponent } from "../../Componentes/button-shett-register-contact/button-shett-register-contact.component";
import {
  Contacto,
  IconRedes,
  IconPhone
} from "../../Interfaces/contactos.interface";
import * as mapBox from "mapbox-gl";
// import mapboxCoder from "@mapbox/mapbox-gl-geocoder";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { environment } from "../../../environments/environment";
import { PreViewComponent } from './pre-view/pre-view.component';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  paises: any;
  formUser: FormGroup = new FormGroup({
    Nombre: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ]),
    Correo: new FormControl(null, [Validators.required, Validators.email]),
    Clave: new FormControl(null, [Validators.required]),
    ClaveConfirm: new FormControl(null, [Validators.required]),
    // Telefono : new FormControl(null,[Validators.required,Validators.minLength(7)]),
    Direccion: new FormControl(null, [Validators.required]),
    IsLocal: new FormControl(true, [Validators.required]),
    Contacto: new FormControl(null),
    IconContactoRed: new FormControl(null),
    IconContactoPhone: new FormControl(null),
    Logo: new FormControl(null, [Validators.required])
  });
  formTrabajos: FormGroup = new FormGroup({
    Trabajo: new FormControl(null),
    Descripcion: new FormControl(null, [Validators.required])
  });

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _serviceAuth: LoginAndRegisterService,
    private servicioLocation: ServiceLocationService,
    private dialog:MatDialog
  ) {}

  ngOnInit() {
    // this.servicioLocation.getCountrys().subscribe(data => {
    //   this.paises = data;
    //   console.log(this.paises);
    // });
  }
  coordinates: any;
  marker = new mapBox.Marker({
    draggable: true
  });
  ngAfterViewInit(): void {
    this.coordinates = document.getElementById("coordinates");
    if ("geolocation" in navigator) {
      // alert("navigation active");
      navigator.geolocation.getCurrentPosition(position => {
        mapBox.accessToken = environment.mapbox_key;
        var map = new mapBox.Map({
          container: "map_box", // container id
          style: "mapbox://styles/mapbox/streets-v11",
          center: [position.coords.longitude, position.coords.latitude], // starting position
          zoom: 9 // starting zoom
        });
        map.addControl(new mapBox.NavigationControl());
        map.addControl(
          new mapBox.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );
        // this.marker = new mapBox.Marker({
        //  draggable: true
        // })
        this.marker
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(map);
        this.marker.on("dragend", () => {
          let lngLat = this.marker.getLngLat();
          this.coordinates.style.display = "block";
          this.coordinates.innerHTML =
            "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
        });
        console.log(this.marker.getLngLat());
      });
      // this.coordinates.innerHTML = 'fernando';
    } else {
      /* geolocation IS NOT available, handle it */

      mapBox.accessToken = environment.mapbox_key;
      var map = new mapBox.Map({
        container: "map_box", // container id
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40], // starting position
        zoom: 9 // starting zoom
      });
      map.addControl(new mapBox.NavigationControl());
      map.addControl(
        new mapBox.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
      //  var marker = new mapBox.Marker({
      //  draggable: true
      //  })
      //  .setLngLat([0, 0])
      //  .addTo(map);
    }
  }

  countrys = [];
  trabajos = [];
  palabras_claves = [];

  searchWord(event: any) {
    const search = event.target.value.toLowerCase();
    console.log(search);
    if (search && search.length > 3) {
      this.servicioLocation.getCountrys(search).subscribe((data: any[]) => {
        this.countrys = data.map(feat => feat.place_name);
        // console.log(data);
      });
    }
  }
  //  @ViewChild('geocoder',{static:true}) geoCoder:ElementRef;
  addTrabajo() {
    let trabajo = this.formTrabajos.controls["Trabajo"];
    if (trabajo.value != "" && trabajo.value != null) {
      this.trabajos.push({'trabajo':trabajo.value});
      trabajo.setValue("");
    } else this.openSnackBar("El trabajo no puede quedar eb blanco", "error");
  }

  deleteTrabajo(index) {
    this.trabajos.splice(index, 1);
  }
  // pais = "Ecuador";
  // provincia = "Guayas";
  // ciudad = "Guayaquil";
  // register() {
  //   // alert(this.trabajos.length);
  //   let nombre = this.formUser.controls["Nombre"].value;
  //   let correo = this.formUser.controls["Correo"].value;
  //   let pass = this.formUser.controls["Clave"].value;
  //   let passConfirm = this.formUser.controls["ClaveConfirm"].value;
  //   console.log(nombre, correo, pass, passConfirm);

  //   let data_send = {
  //     name: nombre,
  //     email: correo,
  //     password: pass,
  //     password_confirmation: passConfirm
  //   };
  //   console.log(data_send);

  //   this._serviceAuth.Register(data_send).subscribe(
  //     data => {
  //       console.log(data_send);
  //       if (data["success"] === true)
  //         this.openSnackBar("Creado Corrrectamente", "success");
  //       else {
  //         this.openSnackBar(data["errors"], "error");
  //       }
  //     } /* ,error=>console.log(error) */
  //   );
  // }

  //#region Contactos -------------------------------------

  selectOption = false;
  typeContact = { name: "", format: "", type: "" };
  contactos = [];
  iconRed = new IconRedes();
  iconPhone = new IconPhone();
  newContacto() {
    let btSheet = this._bottomSheet.open(ButtonShettRegisterContactComponent);
    btSheet.afterDismissed().subscribe(data => {
      // console.log(data);
      switch (data) {
        case "red":
          this.selectOption = true;
          this.typeContact.name = "Ingrese su direccion de red social";
          this.typeContact.format = "url";
          this.typeContact.type = "red";
          break;
        case "correo":
          this.selectOption = true;
          this.typeContact.name = "Ingrese su correo electronico";
          this.typeContact.format = "email";
          this.typeContact.type = "correo";
          break;
        case "pagina":
          this.selectOption = true;
          this.typeContact.name = `Ingrese direccion de pagina web`;
          this.typeContact.format = "url";
          this.typeContact.type = "pagina";
          break;
        case "telefono":
          this.selectOption = true;
          this.typeContact.name = `Ingrese su telefono`;
          this.typeContact.format = "number";
          this.typeContact.type = "telefono";

          break;
        default:
          break;
      }
    });
  }
  addContacto() {
    let contacto = this.formUser.controls["Contacto"];
    if (contacto.value != "" && contacto.value != null) {
      // let contact = new Contacto();
      let contact = {'icon':'',contacto:''}
      switch (this.typeContact.type) {
        case "red":
          let icon = this.searchRedInString(contacto.value);
          // let iconContactoRed = this.formUser.controls["IconContactoRed"].value;
          contact.icon = `fab fa-${icon}`;
          // contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          // contact = {'icon':`fab fa-${icon}`,'contacto':contacto.value}
          this.contactos.push(contact);
          break;
        case "correo":
          contact.icon = "fas fa-envelope";
          // contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        case "pagina":
          contact.icon = "fab fa-internet-explorer";
          // contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        case "telefono":
          let iconContactoPhone = this.formUser.controls["IconContactoPhone"]
            .value;
          contact.icon = iconContactoPhone;
          // contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        default:
          break;
      }
      contacto.setValue("");
    } else this.openSnackBar("El Contacto no puede quedar eb blanco", "error");

    // contact.icon = iconContacto;
    // contact.typo = this.typeContact.type;
    // contact.contacto = contacto.value;
    // this.contactos.push(contact);
    // console.log("icon", iconContacto); //borrar
    // console.log("new contact", contact); //borrar
    // contacto.setValue("");
  }
  deleteContact(index) {
    this.contactos.splice(index, 1);
  }

  cancelContacto() {
    this.typeContact = { name: "", format: "", type: "" };
    this.selectOption = false;
  }

  searchRedInString(data: string): string {
    let array = ["facebook", "instagram", "youtube", "link"];
    for (let index = 0; index < 4; index++) {
      let is = data.indexOf(array[index]);
      if (is !== -1) {
        return array[index];
      }
    }
    return null;
  }
  //#endregion

  locales=[];
  logo:File = null;
   
  loadImg(event)
  {
   this.logo = <File>event.target.files[0];
  //  console.log(this.logo);
   
  }

  sendRegister() {
    if (this.formUser.valid && this.formTrabajos.valid) {
      if (this.trabajos.length <= 5) {
        if(this.trabajos.length > 0)
        {
          if (this.formUser.controls["IsLocal"].value) {
             if(this.locales.length < 1)
             {
               this.openSnackBar('tiene locales pero no la direccion de ellos','error');
               return;
             }
          }
          if (this.contactos.length <= 5) {
            if(this.contactos.length > 0)
            {
              if (this.palabras_claves.length <= 3) {
                if(this.palabras_claves.length > 0)
                {
                  let names = this.formUser.controls["Nombre"].value;
                  let correo = this.formUser.controls["Correo"].value;
                  let clave = this.formUser.controls["Clave"].value;
                  let claveConfirm = this.formUser.controls["ClaveConfirm"].value;
                  let direccion = this.formUser.controls["Direccion"].value;
                  let isLocal = this.formUser.controls["IsLocal"].value;
                  let descripcion = this.formTrabajos.controls["Descripcion"].value;

                  // let jobs = {
                  //   'trabajo1': this.trabajos[0],
                  //   'trabajo2': this.trabajos[1],
                  //   'trabajo3': this.trabajos[2],
                  //   'trabajo4': this.trabajos[3],
                  //   'trabajo5': this.trabajos[4]
                  // };
                  // let contact = {
                  //   'contacto1': this.contactos[0],
                  //   'contacto2': this.contactos[1],
                  //   'contacto3': this.contactos[2],
                  //   'contacto4': this.contactos[3],
                  //   'contacto5': this.contactos[4]
                  // };
                  // let logo = this.formUser.controls["Logo"].value;
                  let fullData = {
                    'name': names,
                    'email': correo,
                    'password': clave,
                    'password_confirm': claveConfirm,
                    'address': direccion,
                    'local': isLocal,
                    'descripcion': descripcion,
                    'trabajos': this.trabajos,
                    'contactos': this.contactos
                    //  'logo': logo
                  };
                  console.log(fullData);
                  
                  // this._serviceAuth.Register(fullData,this.logo).subscribe(data => {
                  //   if (data["success"]) this.openSnackBar("Ok", "success");
                  //   else this.openSnackBar("Not", "error");
                  // });

                }else{
                  this.openSnackBar('Debe tener por lo menos una palabra clave','error');
                }
              } else{
                this.openSnackBar('Solo se admiten maximo 3 palabras y usted tieme más','error');
              }
            } else{
              this.openSnackBar('Debe tener por lo menos un contacto','error');

            }
          } else {
            this.openSnackBar('Solo se admiten maximo 5 contacto y usted tieme más','error');
          }
        }
        else{
          this.openSnackBar('Debe tener por lo menos un trabajo','error');
        }

      }
       else
       {
         this.openSnackBar('Solo se admiten 5 trabajos cuenta con más','error')
       }
    } else {
      let errors:string='';
      Object.keys(this.formUser.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.formUser.get(key).errors;
        if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                errors +=key+'  ';
                
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          console.log(errors);
       this.openSnackBar('Estos campos tienen errores : \n'+errors,'error');
    }
  }

   errores=[]
  validarUser(): boolean {
    return true;
  }

  //#region
  // -----------------------Palabras claves y fin -----------------------
  palabra: string;
  addPalabras() {
    // let trabajo = this.formUser.controls["Trabajo"];
    if (this.palabra != "" && this.palabra != null) {
      // var regex = /^[^\s]+/;
      // var match = regex.exec(this.palabra);
      this.palabras_claves.push(this.palabra);
      this.palabra = "";
    } else this.openSnackBar("El palabra no puede quedar eb blanco", "error");
  }

  deletePalabra(index) {
    this.trabajos.splice(index, 1);
  }

  
  //#endregion

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
  revisar()
  {
    this._serviceAuth.RegisterTest(this.logo).subscribe(data=>console.log(data));
  }
  openDialog(): void {

    let names = this.formUser.controls["Nombre"].value;
    let correo = this.formUser.controls["Correo"].value;
    let clave = this.formUser.controls["Clave"].value;
    let claveConfirm = this.formUser.controls["ClaveConfirm"].value;
    let direccion = this.formUser.controls["Direccion"].value;
    let isLocal = this.formUser.controls["IsLocal"].value;
    let descripcion = this.formTrabajos.controls["Descripcion"].value;
    // var reader = new FileReader();
    // reader.readAsDataURL(this.logo); // read file as data url
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //   let url = <FileReader>event.target
      const dialogRef = this.dialog.open(PreViewComponent, {
      
      width: '90%',
      // height:'',
      data: { 'name': names,
      'email': correo,
      'password': clave,
      'password_confirm': claveConfirm,
      'address': direccion,
      'local': isLocal,
      'descripcion': descripcion,
      'trabajos': this.trabajos,
      'contactos': this.contactos,
      'logo': 'url.result'}
      });
    // }

  }

}
