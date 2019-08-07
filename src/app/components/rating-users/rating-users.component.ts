import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PlayerService} from '../../services/player.service';
import {PlaceColor} from '../../constants';
import {IUser} from '../../types';

@Component({
    selector: 'app-rating-users',
    templateUrl: './rating-users.component.html',
    styleUrls: ['./rating-users.component.css']
})
export class RatingUsersComponent implements OnInit {
    displayedColumns: string[] = ['place', 'name', 'countGame', 'scope'];
    dataSource: MatTableDataSource<IUser>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.playerService.getPlayers().subscribe(users => {
            this.dataSource = new MatTableDataSource(users.sort(this.sortByResult).map(this.mapPlace));
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

    setColor(id: number): string {
        switch (id) {
            case 1:
                return PlaceColor.First;
            case 2:
                return PlaceColor.Second;
            case 3:
                return PlaceColor.Third;
            default:
                return PlaceColor.Default;
        }
    }

    private sortByResult(prev, next): number {
        return (prev.scope / prev.countGame || 0) > (next.scope / next.countGame || 0) ? -1 : 1;
    }

    private mapPlace(user, index): IUser {
        return {
            ...user,
            place: index + 1
        };
    }
}
