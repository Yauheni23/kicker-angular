import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {TeamFromGroup} from '../../constants';

@Component({
    selector: 'app-editor-team',
    templateUrl: './editor-team.component.html',
    styleUrls: ['./editor-team.component.css']
})
export class EditorTeamComponent {
    teamFormGroup: FormGroup;
    success: boolean;
    errorMessage: string;

    constructor(private teamService: TeamService) {
        this.teamFormGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            image: new FormControl('', [Validators.required]),
        });
    }

    onSubmit(form: HTMLFormElement): void {
        this.teamService.createTeam(this.teamFormGroup.value)
            .subscribe((data) => {
                form.reset();
                this.teamService.updateTeam(data);
                this.success = true;
            }, error => {
                this.success = false;
                this.errorMessage = error.error.message;
            });
    }

    get name(): AbstractControl {
        return this.teamFormGroup.get(TeamFromGroup.name);
    }

    get image(): AbstractControl {
        return this.teamFormGroup.get(TeamFromGroup.image);
    }

    clear(): void {
        this.errorMessage = '';
        this.success = false;
    }
}
