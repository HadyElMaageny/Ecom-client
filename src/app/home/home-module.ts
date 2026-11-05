import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './home-component';
import { ShopModule } from '../shop/shop-module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterLink, ShopModule],
  exports: [HomeComponent],
})
export class HomeModule {}
