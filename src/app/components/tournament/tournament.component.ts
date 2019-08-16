import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PlayerService} from '../../services/player.service';
import {IUser} from '../../types';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
    users: IUser[] = [];
    selectedTeams: IUser[][] = [[]];

    constructor(private playerService: PlayerService) {
        this.playerService.getAll().subscribe(users => {
            this.users = users;
        });
    }

    drop(event: CdkDragDrop<IUser[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    dropSelectedPlayer(event: CdkDragDrop<IUser[]>) {
        this.drop(event);
        if (event.container.data.length === 2
            && event.previousContainer.data.length > 1
            && event.previousContainer.id !== event.container.id) {
            this.selectedTeams.push([]);
        }
    }

    twoPredicate(item: CdkDrag, drop: CdkDropList): boolean {
        return drop.data.length < 2;
    }

    isFullTeams(): boolean {
        return (this.selectedTeams.length === 2) && (this.selectedTeams[1].length !== 2) || this.selectedTeams.length < 2
            || this.selectedTeams.some(team => team.length === 1);
    }

    refresh(): void {
        const refreshedUsers = [];
        // @ts-ignore
        this.selectedTeams.flat().sort(() => {
            return Math.random() - 0.5;
        }).forEach((user, index, array) => {
            if (index % 2 === 1) {
                refreshedUsers.push([array[index - 1], array[index]]);
            }
        });

        this.selectedTeams = refreshedUsers;
    }
}
