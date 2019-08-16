import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../services/game.service';
import {GameFormGroup, MAX_GOALS, MIN_GOALS} from '../../../constants';
import {teamValidator, playerGoalsValidator, goalsValidator, playerValidator} from '../../../validators/game-validator';
import {Editor} from '../editor';
import {IGame} from '../../../types';

@Component({
    selector: 'app-editor-game',
    templateUrl: './editor-game.component.html',
    styleUrls: ['./editor-game.component.css']
})
export class EditorGameComponent extends Editor<IGame> {
    readonly maxGoals = MAX_GOALS;
    constructor(private gameService: GameService) {
        super(gameService);
        this.formGroup = new FormGroup({
            team1: this.prepareTeamGroup(),
            team2: this.prepareTeamGroup()
        }, {validators: [teamValidator, playerGoalsValidator, goalsValidator, playerValidator]});
        this.formGroup.valueChanges.subscribe(data =>{
            console.log(data);
        })
    }

    get team1(): AbstractControl {
        return this.formGroup.get(GameFormGroup.firstTeam);
    }

    get team2(): AbstractControl {
        return this.formGroup.get(GameFormGroup.secondTeam);
    }

    get team1Id(): AbstractControl {
        return this.team1.get(GameFormGroup.id);
    }

    get team2Id(): AbstractControl {
        return this.team2.get(GameFormGroup.id);
    }

    get goalsTeam1(): AbstractControl {
        return this.team1.get(GameFormGroup.goals);
    }

    get goalsTeam2(): AbstractControl {
        return this.team2.get(GameFormGroup.goals);
    }

    isNumber(event: KeyboardEvent): boolean {
        return event.charCode >= '0'.charCodeAt(0)  && event.charCode <= '9'.charCodeAt(0);
    }

    private prepareTeamGroup(): FormGroup {
        return new FormGroup({
            id: new FormControl(undefined, [Validators.required]),
            goals: new FormControl(MIN_GOALS, [Validators.required, Validators.max(MAX_GOALS), Validators.min(MIN_GOALS)]),
            player1: this.preparePlayerGroup(),
            player2: this.preparePlayerGroup()
        });
    }

    private preparePlayerGroup(): FormGroup {
        return new FormGroup({
            id: new FormControl(undefined, [Validators.required]),
            goals: new FormControl(MIN_GOALS, [Validators.max(MAX_GOALS), Validators.min(MIN_GOALS)])
        });
    }
}
