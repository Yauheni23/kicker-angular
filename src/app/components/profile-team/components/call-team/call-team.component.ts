import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProfileTeamComponent} from '../../profile-team.component';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../../../services/team.service';
import {CallService} from '../../../../services/call.service';
import {Message, SNACK_BAR_DURATION} from '../../../../constants';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'app-call-team', templateUrl: './call-team.component.html', styleUrls: ['./call-team.component.css']
})
export class CallTeamComponent implements OnInit {
    readonly currentDate = new Date();
    formGroup: FormGroup;
    teams = [];

    constructor(
        public dialogRef: MatDialogRef<ProfileTeamComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private teamService: TeamService,
        public callService: CallService,
        private snackBar: MatSnackBar,
    ) {
        this.formGroup = data.type === 'edit' ? this.createFromForEdit() : this.createFromForCreate();
    }

    ngOnInit(): void {
        this.teamService.getAll()
            .subscribe(teams => {
                this.teams = teams.filter(team =>
                    team.captainId === this.authService.currentUser.id && team.id !== this.activatedRoute.snapshot.params.id
                );
            });
    }

    create() {
        if (!this.formGroup.valid) {
            return;
        }

        this.callService.create(this.formGroup.value).subscribe(() => {
            this.dialogRef.close();
            this.callService.updateAll();
            this.showSnackBar(Message.success)
        }, this.onFailed);
    }


    update() {
        if (!this.formGroup.valid) {
            return;
        }

        this.callService.update(this.formGroup.value, this.data.call.id).subscribe(() => {
            this.dialogRef.close();
            this.callService.updateAll();
            this.showSnackBar(Message.success)
        }, this.onFailed);
    }

    public createFromForEdit() {
        return new FormGroup({
            creatorConfirmed: new FormControl(+this.data.call.creatorId === +this.data.teamId),
            opponentConfirmed: new FormControl(+this.data.call.opponentId === +this.data.teamId),
            date: new FormControl(this.data.call.date, validateDate)
        }, formGroup => {
            const formGroupValue = formGroup.value;

            return formGroupValue.date !== this.data.call.date ?
                null :
                {message: 'Команды совпадают'};
        });
    }

    public createFromForCreate() {
        return new FormGroup({
            creatorId: new FormControl('', [Validators.required]),
            opponentId: new FormControl(this.data.teamId, [Validators.required]),
            date: new FormControl('', validateDate)
        }, formGroup => {
            const formGroupValue = formGroup.value;

            return formGroupValue.creatorId !== formGroupValue.opponentId ?
                null :
                {message: 'Команды совпадают'};
        });
    }

    private onFailed(): void {
        this.showSnackBar(Message.failed);
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, Message.close, {
            duration: SNACK_BAR_DURATION
        });
    }
}

function validateDate(c: FormControl) {
    return c.dirty && (new Date() < new Date(c.value)) ? null : {
        validateEmail: {
            valid: false
        }
    };
}
