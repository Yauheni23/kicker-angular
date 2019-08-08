import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';

@Component({
    selector: 'app-editor-team',
    templateUrl: './editor-team.component.html',
    styleUrls: ['./editor-team.component.css']
})
export class EditorTeamComponent {
    teamFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        image: new FormControl('', [Validators.required]),
    });
    success: boolean;
    errorMessage: string;

    constructor(private teamService: TeamService) {
    }

    onSubmit(): void {
        this.teamService.createTeam(this.teamFormGroup.value)
            .subscribe(() => {
                this.teamFormGroup.reset();
                this.success = true;
            }, error => {
                this.success = false;
                this.errorMessage = error.message;
            });
    }

    get name() {
        return this.teamFormGroup.get('name');
    }

    get image() {
        return this.teamFormGroup.get('image');
    }

    clear(): void {
        this.errorMessage = '';
    }
}
