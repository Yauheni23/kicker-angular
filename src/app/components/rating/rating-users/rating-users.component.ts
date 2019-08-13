import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PlayerService} from '../../../services/player.service';
import {ColorTop, DefaultColor, DisplayedColumns} from '../../../constants';
import {IUser} from '../../../types';
import {Rating} from '../rating';

@Component({
    selector: 'app-rating-users',
    templateUrl: './rating-users.component.html',
    styleUrls: ['./rating-users.component.css']
})
export class RatingUsersComponent extends Rating<IUser> {
    displayedColumns: string[] = DisplayedColumns.ratingUsers;

    constructor(private playerService: PlayerService) {
        super(playerService);
    }

    protected changeData(data: IUser[]): IUser[] {
        return data.sort(this.sortByResult).map(this.mapPlace);
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
