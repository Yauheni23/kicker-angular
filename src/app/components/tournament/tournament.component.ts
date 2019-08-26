import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PlayerService} from '../../services/player.service';
import {IUser} from '../../types';
import {TournamentService} from '../../services/tournament.service';
import {Message, SNACK_BAR_DURATION} from '../../constants';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
    users: IUser[] = [];
    nameTournament: string = 'Tournament';
    nameTeams: string[] = ['Team1'];
    image: FormControl = new FormControl('');
    selectedTeams: IUser[][] = [[]];

    constructor(private playerService: PlayerService, private tournamentService: TournamentService, private snackBar: MatSnackBar) {
        this.playerService.getAll().subscribe(users => {
            this.users = users;
        });

        this.createTournament = this.createTournament.bind(this);
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

    dropSelectedPlayer(event: CdkDragDrop<IUser[]>): void {
        this.drop(event);
        if (event.container.data.length === 2
            && event.previousContainer.data.length > 1
            && event.previousContainer.id !== event.container.id) {
            this.selectedTeams.push([]);
            this.nameTeams.push('Team' + (this.nameTeams.length + 1));
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
        const sortArray = this.selectedTeams.flat();
        const randomCountSort = Math.random() * 10;
        for (let i = 0; i < randomCountSort; i++) {
            sortArray.sort(() => Math.random() - 0.5);
        }
        sortArray.forEach((user, index, array) => {
            if (index % 2 === 1) {
                refreshedUsers.push([array[index - 1], array[index]]);
            }
        });

        this.selectedTeams = refreshedUsers;
    }

    createTournament(): void {
        this.tournamentService.create({
            name: this.nameTournament,
            image: this.image.value,
            teams: this.selectedTeams.filter(team => team.length === 2).map((players, index) => ({
                name: this.nameTeams[index],
                players
            }))
        }).subscribe(() => {
            this.showShackBar(Message.success);
            this.resetCreating();
        }, () => {
            this.showShackBar(Message.failed);
        });
    }

    private resetCreating(): void {
        // @ts-ignore
        this.users = this.users.concat(this.selectedTeams.flat());
        this.selectedTeams = [[]];
        this.image.reset();
        this.nameTournament = 'Tournament';
        this.nameTeams = ['Team1'];
    }

    private showShackBar(message: string): void {
        this.snackBar.open(message, Message.close, {
            duration: SNACK_BAR_DURATION
        });
    }
}
