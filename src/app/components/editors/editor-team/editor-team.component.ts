import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { MIN_LENGTH_NAME, TeamFromGroup } from '../../../constants';
import { Editor } from '../editor';
import { ITeam } from '../../../types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-editor-team',
    templateUrl: './editor-team.component.html',
    styleUrls: [ './editor-team.component.css' ],
})
export class EditorTeamComponent extends Editor<ITeam> {
    constructor(private teamService: TeamService, snackBar: MatSnackBar, private authService: AuthService) {
        super(teamService, snackBar);
        console.log(this.authService.currentUser.id);
        this.formGroup = new FormGroup({
            name: new FormControl('', [ Validators.required, Validators.minLength(MIN_LENGTH_NAME) ]),
            image: new FormControl(''),
            captainId: new FormControl(this.authService.currentUser.id),
        });
    }

    get name(): AbstractControl {
        return this.formGroup.get(TeamFromGroup.name);
    }

    get image(): AbstractControl {
        return this.formGroup.get(TeamFromGroup.image);
    }

    onSuccess(data: ITeam): void {
        if(data.captainId) {
            super.onSuccess(data);
            this.teamService.update(data);
        }
    }
}
