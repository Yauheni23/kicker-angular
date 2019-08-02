import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';
import {IPlayer} from '../../types';

@Component({
    selector: 'app-editor-team',
    templateUrl: './editor-team.component.html',
    styleUrls: ['./editor-team.component.css']
})
export class EditorTeamComponent {
    public teamFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        player1: new FormControl('', Validators.required),
        player2: new FormControl('', Validators.required),
    });
    public success: boolean;
    public errorMessage: string;
    public players: IPlayer[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        this.players = this.playerService.getFreePlayers();
    }

    public onSubmit(): void {
        this.teamService.createTeam(this.teamFormGroup.value)
            .then(() => {
                this.teamFormGroup.reset();
                this.success = true;
                this.players = this.playerService.getFreePlayers();
            })
            .catch(error => {
                this.success = false;
                this.errorMessage = error.message;
            });
    }

    get name() {
        return this.teamFormGroup.get('name');
    }

    get player1() {
        return this.teamFormGroup.get('player1');
    }

    get player2() {
        return this.teamFormGroup.get('player2');
    }

    public clear(): void {
        this.errorMessage = '';
    }
}
