import {FormGroup, ValidationErrors} from '@angular/forms';
import {GameFormGroup, MAX_GOALS} from '../constants';

export const teamValidator = (control: FormGroup): ValidationErrors | null => {
    const { team1, team2 } = getTeams(control, GameFormGroup.firstTeam, GameFormGroup.secondTeam);

    return team1.id === team2.id ? {teamError: true} : null;
};

export const goalsValidator = (control: FormGroup): ValidationErrors | null => {
    const { team1, team2 } = getTeams(control, GameFormGroup.firstTeam, GameFormGroup.secondTeam);

    return team1.goals === team2.goals || !(team1.goals === MAX_GOALS || team2.goals === MAX_GOALS) ? {goalsError: true} : null;
};

export const playerValidator = (control: FormGroup): ValidationErrors | null => {
    const { team1, team2 } = getTeams(control, GameFormGroup.firstTeam, GameFormGroup.secondTeam);

    return team1.player1.id === team2.player1.id || team1.player1.id === team2.player2.id || team1.player2.id === team2.player1.id
    || team1.player2.id === team2.player2.id ? {playersError: true} : null;
};

export const playerGoalsValidator = (control: FormGroup): ValidationErrors | null => {
    const { team1, team2 } = getTeams(control, GameFormGroup.firstTeam, GameFormGroup.secondTeam);

    return (team1.player1.goals + team1.player2.goals > team1.goals) || (team2.player1.goals + team2.player2.goals > team2.goals)
        ? {playersGoalsError: true}
        : null;
};

export const getTeam = (control: FormGroup, controlName: GameFormGroup) => {
    return control.get(controlName).value;
};

export const getTeams = (control: FormGroup, controlName1: GameFormGroup, controlName2: GameFormGroup) => {
    return {
        team1: getTeam(control, controlName1),
        team2: getTeam(control, controlName2)
    };
};
