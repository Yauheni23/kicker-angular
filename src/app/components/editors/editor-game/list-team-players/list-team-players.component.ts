import {Component, Input} from '@angular/core';
import {TeamService} from '../../../../services/team.service';
import {IUser} from '../../../../types';
import {AbstractControl, FormGroup} from '@angular/forms';
import {GameFormGroup} from '../../../../constants';

@Component({
    selector: 'app-list-team-players',
    templateUrl: './list-team-players.component.html',
    styleUrls: ['./list-team-players.component.css']
})
export class ListTeamPlayersComponent {
    @Input() formGroupTeam: FormGroup;

    constructor(private teamService: TeamService) {
        this.filterSelectedPlayers = this.filterSelectedPlayers.bind(this);
    }

    get users(): IUser[] {
        return this.formGroupTeam.value.id
            ? this.teamService.getPlayers(this.formGroupTeam.value.id).filter(this.filterSelectedPlayers)
            : [];
    }

    selectPlayer(playerId: number): void {
        if (!this.player1.value) {
            this.player1.setValue(playerId);
        } else if (!this.player2.value) {
            this.player2.setValue(playerId);
        }
    }

    private get player1(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.firstPlayer).get(GameFormGroup.id);
    }

    private get player2(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.secondPlayer).get(GameFormGroup.id);
    }

    private filterSelectedPlayers(user: IUser): boolean {
        return (user.id !== this.player1.value) && (user.id !== this.player2.value);
    }
}
