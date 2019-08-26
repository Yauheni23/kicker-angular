import {Component} from '@angular/core';
import {PlayerService} from '../../../services/player.service';
import {DisplayedColumns} from '../../../constants';
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
        return data.map(user => ({
            id: user.id,
            name: user.name,
            image: user.image,
            goals: user.games.reduce((accumulator, game) => accumulator + game.goals, 0),
            countGame: user.games.length
        })).sort(this.sortByResult).map(this.mapPlace);
    }

    private sortByResult(prev: IUser, next: IUser): number {
        return (prev.goals / prev.countGame || 0) > (next.goals / next.countGame || 0) ? -1 : 1;
    }

    private mapPlace(user: IUser, index: number): IUser {
        return {
            ...user,
            place: index + 1
        };
    }
}
