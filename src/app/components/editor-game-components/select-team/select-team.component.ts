import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {TeamService} from '../../../services/team.service';
import {ITeam} from '../../../types';
import {VARIANT_GOALS} from '../../../constants';

@Component({
    selector: 'app-select-team',
    templateUrl: './select-team.component.html',
    styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent {
    readonly variantGoals: number[] = VARIANT_GOALS;
    @Input() formGroupTeam: FormGroup;
    teams: ITeam[];

    constructor(private teamService: TeamService) {
        this.teamService.getTeams().subscribe(teams => {
            this.teams = teams;
        });
    }

    get teamId(): AbstractControl {
        return this.formGroupTeam.get('id');
    }

    get goals(): AbstractControl {
        return this.formGroupTeam.get('goals');
    }

    clear() {
        this.formGroupTeam.get('player1').reset();
        this.formGroupTeam.get('player2').reset();
    }
}
