import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-editor-user',
    templateUrl: './editor-user.component.html',
    styleUrls: ['./editor-user.component.css']
})
export class EditorUserComponent {
    public userFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    public success: boolean;
    public errorMessage: string;

    constructor(private playerService: PlayerService) {
    }

    get name() {
        return this.userFormGroup.get('name');
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
