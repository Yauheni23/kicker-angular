import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    @Output() public selectLink: EventEmitter<void> = new EventEmitter();

    public closeSidenav(): void {
        this.selectLink.emit();
    }
}
