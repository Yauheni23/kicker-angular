import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-editor-user',
    templateUrl: './editor-user.component.html',
    styleUrls: ['./editor-user.component.css']
})
export class EditorUserComponent {
    userFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        image: new FormControl('', [Validators.required]),
    });
    success: boolean;
    errorMessage: string;

    constructor(private playerService: PlayerService) {
    }

    get name() {
        return this.userFormGroup.get('name');
    }

    get image() {
        return this.userFormGroup.get('image');
    }

    public onSubmit(): void {
        this.playerService.createPlayer(this.userFormGroup.value)
            .subscribe(() => {
                this.userFormGroup.reset();
                this.success = true;
            }, error => {
                this.errorMessage = error.message;
                this.success = false;
            });
    }

    public clear(): void {
        this.errorMessage = '';
    }


}
