import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {TeamService} from '../../../../services/team.service';
import {ITeam} from '../../../../types';
import {GameFormGroup} from '../../../../constants';

@Component({
    selector: 'app-select-team',
    templateUrl: './select-team.component.html',
    styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent {
    @Input() formGroupTeam: FormGroup;
    @Input() rivalId: FormControl;
    teams: ITeam[];

    constructor(private teamService: TeamService) {
        this.teamService.getAll().subscribe(teams => {
            this.teams = teams;
        });
    }

    get teamId(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.id);
    }

    get goals(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.goals);
    }

    get teamImage(): string {
        return this.teamId.value ? this.teams.find(team => team.id === this.teamId.value).image : '';
    }

    isSelectedRival(id: number): boolean {
        return this.rivalId.value === id;
    }

    clear(): void {
        this.formGroupTeam.get(GameFormGroup.firstPlayer).reset();
        this.formGroupTeam.get(GameFormGroup.secondPlayer).reset();
    }
}
