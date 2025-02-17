import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosComponent } from './calculos/calculos.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [

  {
    path:"",
    component: LayoutComponent,
    children: [
      {
        path:"home",
        component: CalculosComponent
      },
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"cadastro",
        component: CadastroComponent
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }
    ]
  },

  {
    path:"**",
    redirectTo:"home"
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
