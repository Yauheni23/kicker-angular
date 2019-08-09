import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITeam, IUser} from '../../types';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-editor-team-user',
    templateUrl: './editor-team-user.component.html',
    styleUrls: ['./editor-team-user.component.css']
})
export class EditorTeamUserComponent {
    teamFormGroup: FormGroup = new FormGroup({
        team: new FormControl('', [Validators.required]),
        user: new FormControl('', [Validators.required]),
    });
    success: boolean;
    errorMessage: string;
    teams: ITeam[] = [];
    users: IUser[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        this.teamService.getTeams().subscribe(teams => {
            this.teams = teams;
        });
        this.playerService.getPlayers().subscribe(users => {
            this.users = users;
        });
    }

    get team(): AbstractControl {
        return this.teamFormGroup.get('team');
    }

    get user(): AbstractControl {
        return this.teamFormGroup.get('user');
    }

    get freeUsers(): IUser[] {
        return this.users.filter(this.filterFreeUsers);
    }

    onSubmit(form): void {
        this.teamService.addUser(this.teamFormGroup.value)
            .subscribe(() => {
                form.reset();
                this.success = true;
                this.clear();
            }, error => {
                this.success = false;
                this.errorMessage = error.message;
            });
    }

    clear(): void {
        this.errorMessage = '';
    }

    private filterFreeUsers = (user) => {
        return !user.teams.some(team =>  team.id === this.team.value ) && this.team.value;
    }
}
