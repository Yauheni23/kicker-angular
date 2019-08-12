import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {GameFormGroup} from '../../constants';
import {GameValidator} from '../../validators/game-validator';

@Component({
    selector: 'app-editor-game',
    templateUrl: './editor-game.component.html',
    styleUrls: ['./editor-game.component.css']
})
export class EditorGameComponent {
    gameValidator: GameValidator;
    success: boolean = false;
    errorMessage: string;
    gameFormGroup: FormGroup;

    constructor(private gameService: GameService) {
        this.gameValidator = new GameValidator();
        this.gameFormGroup = new FormGroup({
            team1: this.prepareTeamGroup(),
            team2: this.prepareTeamGroup()
        }, {validators: this.gameValidator.getAllValidators()});
    }

    get team1(): AbstractControl {
        return this.gameFormGroup.get(GameFormGroup.firstTeam);
    }

    get team2(): AbstractControl {
        return this.gameFormGroup.get(GameFormGroup.secondTeam);
    }

    createGame(form: HTMLFormElement): void {
        this.gameService.createGame(this.gameFormGroup.value)
            .subscribe(() => {
                form.reset();
                this.clear();
                this.success = true;
            }, error => {
                this.errorMessage = error.error.message;
            });
    }

    clear(): void {
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
