import {Component} from '@angular/core';
import {IPlayer, ITeam} from '../../types';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';
import {EditorGameService} from '../../services/editor-game.service';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css']
})
export class MatchTeamDescriptionComponent {
    public teams: ITeam[] = [];
    public goals: number;
    public players: IPlayer[] = [];
    private selectedTeam: string;
    private teamRival: string;
    private teamsAll: ITeam[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService, private editorService: EditorGameService) {
        this.editorService.getSelectedTeam().subscribe(data => {
            [this.teamRival] = data.filter(el => el !== this.selectedTeam);
            this.listTeamUpdate(this.teamsAll);
        });
        this.teamService.getTeams().subscribe(data => {
            this.teamsAll = data;
            this.listTeamUpdate(this.teamsAll);
        });
    }

    public selectTeam(team: ITeam): void {
        const oldSelectedTeam = this.selectedTeam;
        this.selectedTeam = team.id;
        this.editorService.selectTeam(oldSelectedTeam, this.selectedTeam);
        this.getPlayers(team);
    }

    private listTeamUpdate(teams: ITeam[]): void {
        this.teams = teams.filter(el => el.id !== this.teamRival);
    }

    private getPlayers(team: ITeam): void {
        this.players[0] = this.playerService.getPlayerById(team.player1);
        this.players[1] = this.playerService.getPlayerById(team.player2);
    }
}
