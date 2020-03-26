import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './logIn/PerfilModulo/Perfil/perfil/perfil.component';
import { HomeComponent } from './Free/home/home.component';
import { LoginComponent } from './logOut/login/login.component';
import { RegisterComponent } from './logOut/register/register.component';


const routes: Routes = [
  {path:"", redirectTo:'Home', pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Perfil',component:PerfilComponent},
  {path:'Login',component:LoginComponent},
  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
