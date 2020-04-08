import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-entry', templateUrl: './entry.component.html', styleUrls: [ './entry.component.css' ]
})
export class EntryComponent {
    isLogin = true;

    constructor(private authService: AuthService, private router: Router) {
        if(this.authService.token) {
            this.router.navigate(['user', authService.currentUser.id]);
        }
    }

    toggleForm() {
        this.isLogin = !this.isLogin;
    }
}
