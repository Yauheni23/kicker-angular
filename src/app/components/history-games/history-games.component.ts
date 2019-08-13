import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {GameService} from '../../services/game.service';
import {IGame} from '../../types';
import {DisplayedColumns} from '../../constants';

@Component({
    selector: 'app-history-games',
    templateUrl: './history-games.component.html',
    styleUrls: ['./history-games.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class HistoryGamesComponent implements OnInit {
    readonly pageSizeOptions: number[] = [10, 5, 20, 50];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    dataSource: MatTableDataSource<IGame>;
    displayedColumns: string[] = DisplayedColumns.historyGames;
    expandedElement: IGame | null;

    constructor(private gameService: GameService) {
    }

    ngOnInit(): void {
        this.gameService.getAll().subscribe(games => {
            this.dataSource = new MatTableDataSource<IGame>(games);
            this.dataSource.paginator = this.paginator;
        });
    }
}
