import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop-component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { ShopItem } from './shop-item/shop-item';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [ShopComponent, ShopItem],
  exports: [ShopComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ListboxModule,
    CardModule,
    Button,
    SharedModule,
  ],
})
export class ShopModule {}
