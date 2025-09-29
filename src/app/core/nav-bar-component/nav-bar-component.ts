import {Component} from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  standalone: false,
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss'
})
export class NavBarComponent {
  visible: boolean = false;
  toggleDropdown(event: Event) {
    event.preventDefault(); // stops the page reload caused by href=""
    this.visible = !this.visible;
  }
}
