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
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        player1: new FormControl('', Validators.required),
        player2: new FormControl('', Validators.required),
    });
    public success: boolean;
    public players: IPlayer[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        this.players = this.playerService.getFreePlayers();
    }

    public onSubmit(team, form): void {
        this.teamService.createTeam(team);
        form.reset();
        this.success = true;
    }

    get name() {
        return this.teamFormGroup.get('username');
    }

    get player1() {
        return this.teamFormGroup.get('player1');
    }

    get player2() {
        return this.teamFormGroup.get('player2');
    }

}
