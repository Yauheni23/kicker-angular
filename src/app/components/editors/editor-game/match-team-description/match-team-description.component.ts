import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {GameFormGroup} from '../../../../constants';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css']
})
export class MatchTeamDescriptionComponent {
    @Input() formGroupTeam: FormGroup;
    @Input() float: string;

    get player1(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.firstPlayer);
    }

    get player2(): AbstractControl {
        return this.formGroupTeam.get(GameFormGroup.secondPlayer);
    }

    get goals(): number {
        return this.formGroupTeam.get(GameFormGroup.goals).value;
    }
}
