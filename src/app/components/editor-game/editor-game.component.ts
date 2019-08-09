import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {MAX_GOALS} from '../../constants';

@Component({
    selector: 'app-editor-game',
    templateUrl: './editor-game.component.html',
    styleUrls: ['./editor-game.component.css']
})
export class EditorGameComponent {
    public success: boolean = false;
    public errorMessage: string;
    public gameFormGroup: FormGroup = new FormGroup({
        team1: this.prepareTeamGroup(),
        team2: this.prepareTeamGroup()
    }, {validators: [teamValidator, goalsValidator, playerValidator, playerGoalsValidator]});

    constructor(private gameService: GameService) {
    }

    get team1(): AbstractControl {
        return this.gameFormGroup.get('team1');
    }

    get team2(): AbstractControl {
        return this.gameFormGroup.get('team2');
    }

    public createGame(form): void {
        this.gameService.createGame(this.gameFormGroup.value)
            .subscribe(() => {
                form.reset();
                this.clear();
                this.success = true;
            }, error => {
                this.errorMessage = error.error.message;
            });
    }

    public clear(): void {
        this.errorMessage = '';
    }

    private prepareTeamGroup(): FormGroup {
        return new FormGroup({
            id: new FormControl('', [Validators.required]),
            goals: new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]),
            player1: this.preparePlayerGroup(),
            player2: this.preparePlayerGroup()
        });
    }

    private preparePlayerGroup(): FormGroup {
        return new FormGroup({
            id: new FormControl('', [Validators.required]),
            goals: new FormControl(0, [Validators.max(10), Validators.min(0)])
        });
    }

}

const teamValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const team1 = control.get('team1').value;
    const team2 = control.get('team2').value;

    return team1.id === team2.id ? {'teamError': true} : null;
};

const goalsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const team1 = control.get('team1').value;
    const team2 = control.get('team2').value;

    return team1.goals === team2.goals || !(team1.goals === MAX_GOALS || team2.goals === MAX_GOALS) ? {'goalsError': true} : null;
};

const playerValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const team1 = control.get('team1').value;
    const team2 = control.get('team2').value;

    return team1.player1.id === team2.player1.id || team1.player1.id === team2.player2.id || team1.player2.id === team2.player1.id
    || team1.player2.id === team2.player2.id ? {'playersError': true} : null;
};

const playerGoalsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const team1 = control.get('team1').value;
    const team2 = control.get('team2').value;

    return (team1.player1.goals + team1.player2.goals > team1.goals) || (team2.player1.goals + team2.player2.goals > team2.goals)
        ? {'playersGoalsError': true}
        : null;
};
