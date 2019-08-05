import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {IGoalsStatistics} from '../../types';
import {GameService} from '../../services/game.service';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-history-games',
    templateUrl: './history-games.component.html',
    styleUrls: ['./history-games.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class HistoryGamesComponent implements OnInit {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    dataSource: MatTableDataSource<IGameDescription>;
    columnsToDisplay = ['id', 'teams', 'bill', 'date'];
    expandedElement: IGameDescription | null;

    constructor(private gameService: GameService,
                private teamService: TeamService,
                private playerService: PlayerService) {
    }

    public ngOnInit(): void {
        const games = this.getGameStatistics();
        this.dataSource = new MatTableDataSource<IGameDescription>(games);

        this.dataSource.paginator = this.paginator;
    }

    private getGameStatistics(): any {
        return this.gameService.games.map(game => {
            const team1 = this.teamService.getTeamById(game.team1);
            const team2 = this.teamService.getTeamById(game.team2);

            return {
                ...game,
                team1: team1.name,
                team2: team2.name,
                team1Player1: this.playerService.getPlayerById(team1.players[0]).username,
                team1Player2: this.playerService.getPlayerById(team1.players[1]).username,
                team2Player1: this.playerService.getPlayerById(team2.players[0]).username,
                team2Player2: this.playerService.getPlayerById(team2.players[1]).username,
            };
        }).sort((prev, next) => {
            return +prev.date > +next.date ? -1 : 1;
        }).map((game, index) => ({
            ...game,
            id: index + 1
        }));
    }

}

export interface IGameDescription {
    id: string;
    team1: number;
    team2: number;
    goalsTeam1: string;
    goalsTeam2: string;
    team1Player1: string;
    team1Player2: string;
    team2Player1: string;
    team2Player2: string;
    date: Date;
    goalsStatistics: IGoalsStatistics;
}
