import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  standalone: false,
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.scss'
})
export class PaginationComponent {
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  @Output() pageChanged = new EventEmitter<number>();

  onPageChanged(event: any) {
    this.pageChanged.emit(event);
  }

}
