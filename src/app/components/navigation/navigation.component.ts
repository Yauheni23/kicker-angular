import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navigation', templateUrl: './navigation.component.html', styleUrls: [ './navigation.component.styl' ]
})
export class NavigationComponent {
    @Output() selectLink: EventEmitter<void> = new EventEmitter();

    constructor(private authService: AuthService, private router: Router) {}

    get isEnabled() {
        return !!this.authService.token;
    }

    closeSidenav() {
        this.selectLink.emit();
    }

    async exit() {
        this.closeSidenav();
        this.authService.removeToken();
        await this.router.navigateByUrl('login')
    }
}
