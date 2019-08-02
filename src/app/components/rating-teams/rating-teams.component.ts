import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';

export interface TeamData {
    id: string;
    name: string;
    games: number;
    winRate: number;
    player1: string;
    player2: string;
}

@Component({
    selector: 'app-rating-teams',
    templateUrl: './rating-teams.component.html',
    styleUrls: ['./rating-teams.component.css']
})
export class RatingTeamsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'games', 'winRate', 'player1', 'player2'];
    dataSource: MatTableDataSource<TeamData>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private teamService: TeamService, private playerService: PlayerService) {
    }

    ngOnInit() {
        const teams = this.teamService.teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                games: team.countGame,
                winRate: (team.winGame * 100 / team.countGame) | 0,
                player1: this.playerService.getPlayerById(team.players[0]).username,
                player2: this.playerService.getPlayerById(team.players[1]).username,
            };
        });
        this.dataSource = new MatTableDataSource(teams);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
