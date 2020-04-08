import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-login', templateUrl: './login.component.html', styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
    formGroup: FormGroup;
    hide = true;

    constructor(private authService: AuthService) {
        this.formGroup = new FormGroup({
            mail: new FormControl('yarmolich.e@mail.ru', [ Validators.email, Validators.required ]),
            password: new FormControl('1111', [ Validators.minLength(2), Validators.required ])
        });
    }

    onSubmit() {
        this.authService.login(this.formGroup.value);
    }
}
