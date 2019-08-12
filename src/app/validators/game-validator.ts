import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {GameFormGroup, MAX_GOALS} from '../constants';

export class GameValidator {
    getAllValidators() {
        return [this.goalsValidator, this.playerGoalsValidator, this.teamValidator, this.playerValidator];
    }

    teamValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const team1 = control.get(GameFormGroup.firstTeam).value;
        const team2 = control.get(GameFormGroup.secondTeam).value;

        return team1.id === team2.id ? {teamError: true} : null;
    }

    goalsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const team1 = control.get(GameFormGroup.firstTeam).value;
        const team2 = control.get(GameFormGroup.secondTeam).value;

        return team1.goals === team2.goals || !(team1.goals === MAX_GOALS || team2.goals === MAX_GOALS) ? {goalsError: true} : null;
    }

    playerValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const team1 = control.get(GameFormGroup.firstTeam).value;
        const team2 = control.get(GameFormGroup.secondTeam).value;

        return team1.player1.id === team2.player1.id || team1.player1.id === team2.player2.id || team1.player2.id === team2.player1.id
        || team1.player2.id === team2.player2.id ? {playersError: true} : null;
    }

    playerGoalsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const team1 = control.get(GameFormGroup.firstTeam).value;
        const team2 = control.get(GameFormGroup.secondTeam).value;

        return (team1.player1.goals + team1.player2.goals > team1.goals) || (team2.player1.goals + team2.player2.goals > team2.goals)
            ? {playersGoalsError: true}
            : null;
    }
}
