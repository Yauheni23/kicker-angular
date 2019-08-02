import {Component, Input} from '@angular/core';
import {IPlayer, ITeam} from '../../types';
import {PlayerService} from '../../services/player.service';
import {EditorGameService} from '../../services/editor-game.service';
import {goalsVariant} from '../../constants';
import {PlayerStatisticService} from '../../services/player-statistic.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css'],
    providers: [PlayerStatisticService]
})
export class MatchTeamDescriptionComponent {
    public readonly variantGoals: number[] = goalsVariant;
    @Input() formGroupTeam: FormGroup | AbstractControl;
    public teams: ITeam[] = [];
    public players: IPlayer[] = [];
    private selectedTeam: ITeam;

    constructor(private playerService: PlayerService,
                private editorService: EditorGameService,
                private playerStatisticService: PlayerStatisticService) {
        this.editorService.getTeams().subscribe(data => {
            if (!this.selectedTeam || (this.selectedTeam && data.some(el => el.id === this.selectedTeam.id))) {
                this.selectedTeam = undefined;
                this.teams = data;
            } else {
                this.teams = data.concat(this.selectedTeam);
            }
        });
    }

    get name(): AbstractControl {
        return this.formGroupTeam.get('name');
    }

    get countGoals(): AbstractControl {
        return this.formGroupTeam.get('countGoals');
    }

    get playersStatistics(): AbstractControl[] {
        return [this.formGroupTeam.get('playersStatistics').get('goalsPlayer1'),
            this.formGroupTeam.get('playersStatistics').get('goalsPlayer2')];
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
