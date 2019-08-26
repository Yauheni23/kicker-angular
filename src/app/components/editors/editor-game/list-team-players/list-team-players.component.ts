import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from '../../../../services/team.service';
import {IUser} from '../../../../types';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {COUNT_PLAYERS_IN_TEAM, GameFormGroup} from '../../../../constants';

@Component({
    selector: 'app-list-team-players',
    templateUrl: './list-team-players.component.html',
    styleUrls: ['./list-team-players.component.css']
})
export class ListTeamPlayersComponent implements OnInit {
    @Input() formGroupTeam: FormGroup;
    @Input() formGroupRival: FormGroup;
    users: IUser[] = [];
    selectedUsers: IUser[] = [];
    selectedRivalUsers: IUser[] = [];
    selectedTeam: number;

    constructor(private teamService: TeamService) {
        this.sortPlayer = this.sortPlayer.bind(this);
    }

    ngOnInit(): void {
        this.formGroupTeam.valueChanges.subscribe(data => {
            if (data.id && +data.id !== this.selectedTeam) {
                this.selectedUsers = [];
                this.selectedTeam = +data.id;
                this.teamService.getById(this.selectedTeam).subscribe(team => {
                    this.users = team.users;
                });
            } else if (!data.id) {
                this.selectedTeam = undefined;
                this.selectedUsers = [];
                this.users = [];
            }
        });
        this.formGroupRival.valueChanges.subscribe(data => {
            this.selectedRivalUsers[0] = data.player1;
            this.selectedRivalUsers[1] = data.player2;
        });
    }

    get player1(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.firstPlayer);
    }

    get player2(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.secondPlayer);
    }

    selectUser(user: IUser): void {
        if (this.selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
            this.player1.get(GameFormGroup.id).value === user.id ? this.player1.reset() : this.player2.reset();
            this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.id !== user.id);
        } else {
            this.addPlayer(user);
        }
        this.users.sort(this.sortPlayer);
    }

    isSelectedRival(id: number): boolean {
        return (this.selectedRivalUsers[0] && this.selectedRivalUsers[0].id === id)
            || (this.selectedRivalUsers[1] && this.selectedRivalUsers[1].id === id);
    }

    isTeamFull(id: number): boolean {
        return !this.selectedUsers.some(selectedUser => selectedUser.id === id)
            && this.selectedUsers.length === COUNT_PLAYERS_IN_TEAM;
    }

    isSelectedPlayer(id: number): boolean {
        return this.selectedUsers.some(selectedUser => selectedUser.id === id);
    }

    getFormControl(id: number): AbstractControl | undefined {
        const user = this.selectedUsers.find(selectedUser => selectedUser.id === id);
        if (user && user.id === this.player1.get(GameFormGroup.id).value) {
            return this.player1.get(GameFormGroup.goals);
        }
        if (user && user.id === this.player2.get(GameFormGroup.id).value) {
            return this.player2.get(GameFormGroup.goals);
        }
    }

    isNumber(event: KeyboardEvent): boolean {
        return event.charCode >= '0'.charCodeAt(0)  && event.charCode <= '9'.charCodeAt(0);
    }

    private addPlayer(user: IUser): void {
        if (this.player1.get(GameFormGroup.id).value) {
            this.player2.get(GameFormGroup.id).setValue(user.id);
        } else {
            this.player1.get(GameFormGroup.id).setValue(user.id);
        }
        this.selectedUsers.push(user);
    }

    private sortPlayer(current: IUser): number {
        return this.selectedUsers.find(selectedUser => selectedUser.id === current.id) ? -1 : 1;
    }
}
