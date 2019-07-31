import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public toggleSidenav = new EventEmitter();

  constructor() { }

  public toggle() {
    this.toggleSidenav.emit();
  }

}
