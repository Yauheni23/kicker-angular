import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../../profile/profile.component';


@Component({
    selector: 'app-change-password', templateUrl: './change-password.component.html', styleUrls: [ './change-password.component.css' ]
})
export class ChangePasswordComponent implements OnInit {
    hide = true;
    formGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.formGroup = new FormGroup({
            currentPassword: new FormControl('', Validators.minLength(2)),
            newPassword: new FormControl('', Validators.minLength(2)),
            newRepeatPassword: new FormControl('', Validators.minLength(2))
        }, formGroup => {
            const formGroupValue = formGroup.value;

            return formGroupValue.currentPassword !== formGroupValue.newPassword && formGroupValue.newPassword === formGroupValue.newRepeatPassword ?
                null :
                { password: 'Пароли совпадают' };
        });
    }

    ngOnInit(): void {
    }

    changePassword() {
        if(!this.formGroup.valid) {
            return;
        }

        const {currentPassword, newPassword} = this.formGroup.value;

        this.data.updatePassword({
            currentPassword,
            newPassword
        }).subscribe(() => this.dialogRef.close());
    }
}
