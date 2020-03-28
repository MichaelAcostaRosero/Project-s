import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { LoginAndRegisterService } from "../../Servicios/login-and-register.service";
import { ServiceLocationService } from "../../Servicios/service-location.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ButtonShettRegisterContactComponent } from "../../Componentes/button-shett-register-contact/button-shett-register-contact.component";
import { Contacto, IconRedes, IconPhone } from "../../Interfaces/contactos.interface";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  formUser: FormGroup = new FormGroup({
    Nombre: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ]),
    Correo: new FormControl(null, [Validators.required, Validators.email]),
    Clave: new FormControl(null, [Validators.required]),
    ClaveConfirm: new FormControl(null, [Validators.required]),
    // Telefono : new FormControl(null,[Validators.required,Validators.minLength(7)]),
    Trabajo: new FormControl(null),
    Contacto: new FormControl(null),
    IconContactoRed: new FormControl(null),
    IconContactoPhone: new FormControl(null),
    Descripcion: new FormControl(null)
  });
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _serviceAuth: LoginAndRegisterService,
    private servicioLocation: ServiceLocationService
  ) {}
  paises: any;
  ngOnInit() {
    this.servicioLocation.getCountrys().subscribe(data => {
      this.paises = data;
      console.log(this.paises);
    });
  }
  // trabajo:string="";
  trabajos = [];
  addTrabajo() {
    let trabajo = this.formUser.controls["Trabajo"];
    if (trabajo.value != "" && trabajo.value != null) {
      this.trabajos.push(trabajo.value);
      trabajo.setValue("");
    } else this.openSnackBar("El trabajo no puede quedar eb blanco", "error");
  }

  deleteTrabajo(index) {
    this.trabajos.splice(index, 1);
  }
  pais = "Ecuador";
  provincia = "Guayas";
  ciudad = "Guayaquil";
  register() {
    // alert(this.trabajos.length);
    let nombre = this.formUser.controls["Nombre"].value;
    let correo = this.formUser.controls["Correo"].value;
    let pass = this.formUser.controls["Clave"].value;
    let passConfirm = this.formUser.controls["ClaveConfirm"].value;
    console.log(nombre, correo, pass, passConfirm);

    let data_send = {
      name: nombre,
      email: correo,
      password: pass,
      password_confirmation: passConfirm
    };
    console.log(data_send);

    this._serviceAuth.Register(data_send).subscribe(
      data => {
        console.log(data_send);
        if (data["success"] === true)
          this.openSnackBar("Creado Corrrectamente", "success");
        else {
          this.openSnackBar(data["errors"], "error");
        }
      } /* ,error=>console.log(error) */
    );
  }

  //#region Contactos -------------------------------------

  selectOption = false;
  typeContact = { name: "", format: "", type: "" };
  contactos = [];
  iconRed = new IconRedes();
  iconPhone = new IconPhone();
  newContacto() {
    let btSheet = this._bottomSheet.open(ButtonShettRegisterContactComponent);
    btSheet.afterDismissed().subscribe(data => {
      console.log(data);
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
      let contact = new Contacto();

      switch (this.typeContact.type) {
        case "red":
          let iconContactoRed = this.formUser.controls["IconContactoRed"].value;
          contact.icon = iconContactoRed;
          contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        case "correo":
          contact.icon = 'fas fa-envelope';
          contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        case "pagina":
          contact.icon = 'fab fa-internet-explorer';
          contact.typo = this.typeContact.type;
          contact.contacto = contacto.value;
          this.contactos.push(contact);
          break;
        case "telefono":
          let iconContactoPhone = this.formUser.controls["IconContactoPhone"].value;
          contact.icon = iconContactoPhone;
          contact.typo = this.typeContact.type;
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
  //#endregion

  public eleccion() {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
