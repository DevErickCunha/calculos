import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosComponent } from './calculos/calculos.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PaiComponent } from './pai/pai.component';

const routes: Routes = [

  {
    path:"app",
    component: LayoutComponent,
    children: [
      {
        path:"home",
        component: CalculosComponent
      },
      {
        path:"pai",
        component: PaiComponent
      },
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"cadastro",
        component: CadastroComponent
      }
    ]
  },

  {
    path:"**",
    redirectTo:"app/home"
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
