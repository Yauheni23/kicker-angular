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
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        role: new FormControl('', Validators.required),
    });
    public success: boolean;

    constructor(private playerService: PlayerService) {
    }

    public onSubmit(player, form): void {
        this.playerService.createPlayer(player);
        form.reset();
        this.success = true;
    }

    get username() {
        return this.userFormGroup.get('username');
    }

    get role() {
        return this.userFormGroup.get('role');
    }
}
