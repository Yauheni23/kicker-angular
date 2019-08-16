import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../../services/player.service';
import {MIN_LENGTH_NAME, UserFormGroup} from '../../../constants';
import {Editor} from '../editor';
import {IUser} from '../../../types';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-editor-user',
    templateUrl: './editor-user.component.html',
    styleUrls: ['./editor-user.component.css']
})
export class EditorUserComponent extends Editor<IUser> {
    constructor(private playerService: PlayerService, snackBar: MatSnackBar) {
        super(playerService, snackBar);
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]),
            image: new FormControl(''),
        });
    }

    get name(): AbstractControl {
        return this.formGroup.get(UserFormGroup.name);
    }

    get image(): AbstractControl {
        return this.formGroup.get(UserFormGroup.image);
    }

    onSuccess(data: IUser): void {
        super.onSuccess(data);
        this.playerService.update(data);
    }
}
