import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formUser:FormGroup = new FormGroup({
    Nombre : new FormControl(null,[Validators.required, Validators.minLength(5)]),
    Correo :new FormControl(null,[Validators.required,Validators.email]),
    Telefono : new FormControl(null,[Validators.required,Validators.minLength(7)]),
    Trabajo :new FormControl(null,[Validators.required]),
    Descripcion :new FormControl(null)
  });
  constructor(private _snackBar:MatSnackBar) { }

  ngOnInit() {
  }
  // trabajo:string="";
  trabajos=[];
  addTrabajo()
  {

    let trabajo = this.formUser.controls['Trabajo'];
    if(trabajo.valid)
    {
      // this.trabajos.map(item=>{
      //     if(item === this.trabajo) console.log('trabajo ya existe ',item);     
      //     return item;
      // })
      this.trabajos.push(trabajo.value);
      trabajo.setValue("");
    }
    else this.openSnackBar("El trabajo no puede quedar eb blanco",'error');
  }
  deleteTrabajo(index)
  {
    alert(this.trabajos[index]);
    console.log(this.trabajos);
    this.trabajos.splice(index,1);
    console.log(this.trabajos);
  }








  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
