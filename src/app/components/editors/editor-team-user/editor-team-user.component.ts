import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITeam, IUser} from '../../../types';
import {TeamService} from '../../../services/team.service';
import {PlayerService} from '../../../services/player.service';
import {TeamFromGroup} from '../../../constants';
import {Editor} from '../editor';

@Component({
    selector: 'app-editor-team-user',
    templateUrl: './editor-team-user.component.html',
    styleUrls: ['./editor-team-user.component.css']
})
export class EditorTeamUserComponent extends Editor<any> {
    teams: ITeam[] = [];
    users: IUser[] = [];

    constructor(private teamService: TeamService, private playerService: PlayerService) {
        super(teamService);
        this.formGroup = EditorTeamUserComponent.prepareFormGroup();
        this.teamService.getAll().subscribe(teams => {
            this.teams = teams;
        });
        this.playerService.getAll().subscribe(users => {
            this.users = users;
        });

        this.filterFreeUsers = this.filterFreeUsers.bind(this);
    }

    static prepareFormGroup(): FormGroup {
        return new FormGroup({
            teamId: new FormControl('', [Validators.required]),
            userId: new FormControl('', [Validators.required]),
        });
    }

    get team(): AbstractControl {
        return this.formGroup.get(TeamFromGroup.teamId);
    }

    get user(): AbstractControl {
        return this.formGroup.get(TeamFromGroup.userId);
    }

    get freeUsers(): IUser[] {
        return this.users.filter(this.filterFreeUsers);
    }

    onSubmit(form: HTMLFormElement): void {
        this.formHTMLElement = form;
        this.teamService.addPlayer(this.formGroup.value)
            .subscribe(this.onSuccess, this.onFailed);
    }

    private filterFreeUsers(user: IUser): boolean {
        return this.team.value && !user.teams.some(team => team.id === this.team.value);
    }
}
