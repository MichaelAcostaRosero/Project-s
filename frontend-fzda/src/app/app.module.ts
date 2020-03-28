import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Componentes/nav-bar/nav-bar.component';
import { PerfilModule } from './logIn/PerfilModulo/perfil.module';
import { HomeComponent } from './Free/home/home.component';
import { LoginComponent } from './logOut/login/login.component';
import { RegisterComponent } from './logOut/register/register.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatStepperModule,
  MatSelectModule,
  MatBottomSheetModule,
  MatListModule,
  MatRadioModule
}
from '@angular/material';
import { ButtonShettRegisterContactComponent } from './Componentes/button-shett-register-contact/button-shett-register-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ButtonShettRegisterContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    PerfilModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule
  ],
  entryComponents:[ButtonShettRegisterContactComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
