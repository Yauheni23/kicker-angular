import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {GameService} from '../../services/game.service';
import {IGame} from '../../types';

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
    dataSource: MatTableDataSource<IGame>;
    columnsToDisplay = ['id', 'teams', 'bill', 'date'];
    expandedElement: IGame | null;

    constructor(private gameService: GameService) {
    }

    public ngOnInit(): void {
        this.gameService.getGames().subscribe(games => {
            this.dataSource = new MatTableDataSource<IGame>(games.map(this.mapGameId));
            this.dataSource.paginator = this.paginator;
        });
    }

    private mapGameId(game, index) {
        return {
            ...game,
            gameId: index + 1
        };
    }
}
