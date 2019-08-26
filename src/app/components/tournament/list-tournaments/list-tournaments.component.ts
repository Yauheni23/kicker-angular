import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {TournamentService} from '../../../services/tournament.service';
import {ITournament} from '../../../types';

@Component({
    selector: 'app-list-tournaments',
    templateUrl: './list-tournaments.component.html',
    styleUrls: ['./list-tournaments.component.css']
})
export class ListTournamentsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'image', 'name', 'status'];
    dataSource: MatTableDataSource<ITournament>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    tournaments: ITournament[] = [];

    constructor(private tournamentService: TournamentService) {

    }

    ngOnInit() {
        this.tournamentService.getAll().subscribe(tourmanents => {
            this.tournaments = tourmanents;
            this.dataSource = new MatTableDataSource<ITournament>(tourmanents);
            this.dataSource.paginator = this.paginator;
        });

    }

}
