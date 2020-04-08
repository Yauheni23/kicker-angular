import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
    formGroup: FormGroup;
    hide = true;

    constructor(private auth: AuthService) {
        this.formGroup = new FormGroup({
            mail: new FormControl('mail@mail.ru', [Validators.email, Validators.required]),
            name: new FormControl('lol', [Validators.minLength(2), Validators.required]),
            password: new FormControl('12345678', [Validators.minLength(2), Validators.required]),
            repeatPassword: new FormControl('12345678', [Validators.minLength(2), Validators.required]),
        })
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.register(this.formGroup.value);
    }
}
