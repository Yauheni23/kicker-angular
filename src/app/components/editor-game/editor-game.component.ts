import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {EditorGameService} from '../../services/editor-game.service';

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
    });

    constructor(private gameService: GameService, private editorGameService: EditorGameService) {
    }

    get team1(): AbstractControl {
        return this.gameFormGroup.get('team1');
    }

    get team2(): AbstractControl {
        return this.gameFormGroup.get('team2');
    }

    public createGame(): void {
        this.gameService.createGame(this.gameFormGroup.value)
            .then(() => {
                this.gameFormGroup.reset();
                this.editorGameService.clear();
                this.clear();
                this.success = true;
            })
            .catch(error => {
                this.errorMessage = error.message;
            });
    }

    public clear(): void {
        this.errorMessage = '';
    }

    private prepareTeamGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl('', Validators.required),
            countGoals: new FormControl(undefined, [Validators.required, Validators.max(11), Validators.min(0)]),
            playersStatistics: new FormGroup({
                goalsPlayer1: new FormControl(0, [Validators.max(11), Validators.min(0)]),
                goalsPlayer2: new FormControl(0, [Validators.max(11), Validators.min(0)])
            })
        });
    }
}
