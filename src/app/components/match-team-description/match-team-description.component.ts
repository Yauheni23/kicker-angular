import {Component} from '@angular/core';
import {IPlayer, ITeam} from '../../types';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css']
})
export class MatchTeamDescriptionComponent {
    public goals: number;
    public teams: ITeam[];
    public players: IPlayer[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        this.teamService.getTeams().subscribe(data => {
            this.teams = data;
        });

    }

    public getPlayers(team: ITeam): void {
        this.players[0] = this.playerService.getPlayerById(team.player1);
        this.players[1] = this.playerService.getPlayerById(team.player2);
    }
}
