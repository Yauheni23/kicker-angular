import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITeam, IUser} from '../../types';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-editor-team-user',
    templateUrl: './editor-team-user.component.html',
    styleUrls: ['./editor-team-user.component.css']
})
export class EditorTeamUserComponent {
    teamFormGroup = new FormGroup({
        team: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    }

    onSubmit(): void {
        this.teamService.addUser(this.teamFormGroup.value)
            .subscribe(() => {
                this.teamFormGroup.reset();
                this.success = true;
                this.clear();
            }, error => {
                this.success = false;
                this.errorMessage = error.message;
            });
    }

    get team() {
        return this.teamFormGroup.get('team');
    }

    get user() {
        return this.teamFormGroup.get('user');
    }

    selectTeam(): void {
        this.playerService.getPlayers().subscribe(users => {
            this.users = users.filter(this.filterFreeUsers);
        });
    }

    clear(): void {
        this.errorMessage = '';
    }

    private filterFreeUsers = (user) => {
        return !user.teams.some(team => {
            return team.id === this.team.value;
        });
    }
}
