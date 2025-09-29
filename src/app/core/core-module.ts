import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import {RouterLink} from '@angular/router';
import {MenubarModule} from 'primeng/menubar';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MenubarModule
  ]
})
export class CoreModule { }
