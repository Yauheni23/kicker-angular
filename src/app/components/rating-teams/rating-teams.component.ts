import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TeamService} from '../../services/team.service';
import {ColorTop, DefaultColor, DisplayedColumns, MAX_GOALS} from '../../constants';
import {ITeam} from '../../types';

@Component({
    selector: 'app-rating-teams',
    templateUrl: './rating-teams.component.html',
    styleUrls: ['./rating-teams.component.css']
})
export class RatingTeamsComponent implements OnInit {
    displayedColumns: string[] = DisplayedColumns.ratingTeams;
    dataSource: MatTableDataSource<ITeam>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private teamService: TeamService) {
    }

    ngOnInit(): void {
        this.teamService.getTeams().subscribe(teams => {
            this.dataSource = new MatTableDataSource(teams.map(this.mapTeams).sort(this.sortWinRate).map(this.mapPlace));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    setColor(place: number): string {
        return ColorTop[place - 1] || DefaultColor;
    }

    private mapTeams = (team): ITeam => {
        return {
            id: team.id,
            name: team.name,
            users: team.users,
            image: team.image,
            games: team.games.length,
            goals: team.goals,
            winRate: this.considerWinRate(team)
        };
    }

    private considerWinRate(team): number {
        return +(team.games.length ? team.games.reduce(reduceWinRate, 0) / team.games.length * 100 : 0).toFixed(2);

        function reduceWinRate(accumulator, game): number {
            return accumulator
                + ((game.team1.id === team.id && game.team1.goals === MAX_GOALS)
                || (game.team2.id === team.id && game.team2.goals === MAX_GOALS) ? 1 : 0);
        }
    }

    private sortWinRate(current, next): number {
        return current.winRate > next.winRate ? -1 : 1;
    }

    private mapPlace(team, index): ITeam {
        return {
            ...team,
            place: index + 1
        };
    }
}
