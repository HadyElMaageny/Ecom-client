import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationComponent } from './Components/pagination-component/pagination-component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, PaginationModule],
  exports: [PaginationModule, PaginationComponent],
})
export class SharedModule {}
