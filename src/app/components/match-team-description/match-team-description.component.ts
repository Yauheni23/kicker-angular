import {Component, Input} from '@angular/core';
import {PlayerStatisticService} from '../../services/player-statistic.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-match-team-description',
    templateUrl: './match-team-description.component.html',
    styleUrls: ['./match-team-description.component.css'],
    providers: [PlayerStatisticService]
})
export class MatchTeamDescriptionComponent {
    @Input() formGroupTeam: FormGroup;
    @Input() float: string;

    get player1(): AbstractControl {
        return this.formGroupTeam.get('player1');
    }

    get player2(): AbstractControl {
        return this.formGroupTeam.get('player2');
    }

    get goals(): number {
        return this.formGroupTeam.get('goals').value;
    }
}
