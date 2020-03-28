import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { RegisterComponent } from '../../logOut/register/register.component';

@Component({
  selector: 'app-button-shett-register-contact',
  templateUrl: './button-shett-register-contact.component.html',
  styleUrls: ['./button-shett-register-contact.component.scss']
})
export class ButtonShettRegisterContactComponent  {

  constructor(private _bottomSheetRef: MatBottomSheetRef<RegisterComponent>) {}

  openLink(opcion): void {
    this._bottomSheetRef
    this._bottomSheetRef.dismiss(opcion);
    // event.preventDefault();
  }
}
