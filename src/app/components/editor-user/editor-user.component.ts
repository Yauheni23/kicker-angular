import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {UserFormGroup} from '../../constants';

@Component({
    selector: 'app-editor-user',
    templateUrl: './editor-user.component.html',
    styleUrls: ['./editor-user.component.css']
})
export class EditorUserComponent {
    userFormGroup: FormGroup;
    success: boolean;
    errorMessage: string;

    constructor(private playerService: PlayerService) {
        this.userFormGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            image: new FormControl('', [Validators.required]),
        });
    }

    get name(): AbstractControl {
        return this.userFormGroup.get(UserFormGroup.name);
    }

    get image(): AbstractControl {
        return this.userFormGroup.get(UserFormGroup.image);
    }

    onSubmit(form): void {
        this.playerService.createPlayer(this.userFormGroup.value)
            .subscribe((data) => {
                this.playerService.updateUser(data);
                form.reset();
                this.success = true;
            }, error => {
                this.errorMessage = error.error.message;
                this.success = false;
            });
    }

    clear(): void {
        this.errorMessage = '';
    }
}
