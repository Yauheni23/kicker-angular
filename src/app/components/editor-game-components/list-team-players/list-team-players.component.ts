import {Component, Input} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {IUser} from '../../../types';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-list-team-players',
    templateUrl: './list-team-players.component.html',
    styleUrls: ['./list-team-players.component.css']
})
export class ListTeamPlayersComponent {
    @Input() formGroupTeam: FormGroup;

    constructor(private teamService: TeamService) {
    }

    get users(): IUser[] {
        return this.formGroupTeam.value.id
            ? this.teamService.getUsers(this.formGroupTeam.value.id).filter(this.filterSelectedPlayers)
            : [];
    }

    selectPlayer(playerId: number): void {
        if (!this.player1.value) {
            this.player1.setValue(playerId);
        } else if (!this.player2.value) {
            this.player2.setValue(playerId);
        } else {
            console.log('Player has selected');
        }
    }

    private get player1() {
        return this.formGroupTeam.get('player1').get('id');
    }

    private get player2() {
        return this.formGroupTeam.get('player2').get('id');
    }

    private filterSelectedPlayers = (user) => {
        return (user.id !== this.player1.value) && (user.id !== this.player2.value);
    }
}
