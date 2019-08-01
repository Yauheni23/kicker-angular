import {Component} from '@angular/core';
import {IPlayer, ITeam} from '../../types';
import {PlayerService} from '../../services/player.service';
import {EditorGameService} from '../../services/editor-game.service';
import {goalsVariant} from '../../constants';
import {PlayerStatisticService} from '../../services/player-statistic.service';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css'],
    providers: [PlayerStatisticService]
})
export class MatchTeamDescriptionComponent {
    public readonly variantGoals: number[] = goalsVariant;
    public teams: ITeam[] = [];
    public players: IPlayer[] = [];
    private selectedTeam: ITeam;

    constructor(private playerService: PlayerService,
                private editorService: EditorGameService,
                private playerStatisticService: PlayerStatisticService) {
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

    public setMaxGoals(countGoals: number) {
        this.playerStatisticService.setMaxGoals(countGoals);
    }

    private getPlayers(): void {

        this.players = this.playerService.getPlayerByTeam(this.selectedTeam);
        this.playerStatisticService.setCountPlayers(this.players.length);
    }
}
