import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop-component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';


@NgModule({
  declarations: [
    ShopComponent
  ],
  exports: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ListboxModule,
    CardModule,
    Button,
  ]
})
export class ShopModule { }
