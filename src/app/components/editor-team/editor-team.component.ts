import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';
import {IUser} from '../../types';

@Component({
    selector: 'app-editor-team',
    templateUrl: './editor-team.component.html',
    styleUrls: ['./editor-team.component.css']
})
export class EditorTeamComponent {
    teamFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        image: new FormControl('', [Validators.required]),
    });
    success: boolean;
    errorMessage: string;
    players: IUser[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        this.players = this.playerService.getFreePlayers();
    }

    onSubmit(): void {
        this.teamService.createTeam(this.teamFormGroup.value)
            .subscribe(() => {
                this.teamFormGroup.reset();
                this.success = true;
                this.players = this.playerService.getFreePlayers();
            }, error => {
                this.success = false;
                this.errorMessage = error.message;
            });
    }

    get name() {
        return this.teamFormGroup.get('name');
    }

    get image() {
        return this.teamFormGroup.get('image');
    }

    clear(): void {
        this.errorMessage = '';
    }
}
