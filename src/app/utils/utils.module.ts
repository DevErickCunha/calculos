import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Input1Component } from './forms/input-1/input-1.component';
import { ContentSideMenuComponent } from './side-menu/content/content.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    Input1Component,
    ContentSideMenuComponent,
    NavBarComponent,
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    Input1Component,
    ContentSideMenuComponent,
    NavBarComponent,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
})
export class UtilsModule { }
