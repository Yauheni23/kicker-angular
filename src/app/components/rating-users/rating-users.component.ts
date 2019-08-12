import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PlayerService} from '../../services/player.service';
import {ColorTop, DefaultColor, DisplayedColumns} from '../../constants';
import {IUser} from '../../types';

@Component({
    selector: 'app-rating-users',
    templateUrl: './rating-users.component.html',
    styleUrls: ['./rating-users.component.css']
})
export class RatingUsersComponent implements OnInit {
    displayedColumns: string[] = DisplayedColumns.ratingUsers;
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

    setColor(place: number): string {
        return ColorTop[place - 1] || DefaultColor;
    }

    private sortByResult(prev: IUser, next: IUser): number {
        return (prev.scope / prev.countGame || 0) > (next.scope / next.countGame || 0) ? -1 : 1;
    }

    private mapPlace(user: IUser, index: number): IUser {
        return {
            ...user,
            place: index + 1
        };
    }
}
