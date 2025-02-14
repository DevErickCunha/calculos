import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosComponent } from './calculos/calculos.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path:"",
    component: AppComponent
  },
  {
    path:"home",
    component: CalculosComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
