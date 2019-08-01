import {Component} from '@angular/core';
import {IPlayer, ITeam} from '../../types';
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
    private selectedTeam: ITeam;

    constructor(private playerService: PlayerService, private editorService: EditorGameService) {
        this.editorService.getTeams().subscribe(data => {
            this.selectedTeam ? this.teams = data.concat(this.selectedTeam) : this.teams = data;
        });
    }

    public selectTeam(team: ITeam): void {
        const oldSelectedTeamId = this.selectedTeam ? this.selectedTeam.id : undefined;
        this.selectedTeam = team;
        this.editorService.selectTeam(oldSelectedTeamId, this.selectedTeam.id);

        this.getPlayers();
    }

    private getPlayers(): void {
        this.players = this.playerService.getPlayerByTeam(this.selectedTeam);
    }
}
