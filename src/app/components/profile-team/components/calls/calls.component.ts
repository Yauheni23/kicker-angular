import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {CallService} from '../../../../services/call.service';
import {MatDialog} from '@angular/material/dialog';
import {CallTeamComponent} from '../call-team/call-team.component';
import {CallDialogComponent} from '../call-dialog/call-dialog.component';
import {Message, SNACK_BAR_DURATION} from '../../../../constants';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-calls',
    templateUrl: './calls.component.html',
    styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {
    calls = [];

    constructor(
        public authService: AuthService,
        public activatedRoute: ActivatedRoute,
        private callService: CallService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
        this.apply = this.apply.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    ngOnInit(): void {
        this.callService.getAll({
            id: this.activatedRoute.snapshot.params.id
        }).subscribe(calls => {
            console.log(calls);
            this.calls = calls
        })
    }

    isConfirmed(call) {
        return ((+this.activatedRoute.snapshot.params.id === +call.opponentId) && call.opponentConfirmed) ||
            ((+this.activatedRoute.snapshot.params.id === +call.creatorId) && call.creatorConfirmed);
    }

    openDialog(call, type): void {
        const dialogRef = this.dialog.open(CallDialogComponent, {
            data: {
                title: type === 'apply' ? `Принять вызов?` : 'Отклонить вызов?',
                call
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    type === 'apply' ? this.apply(call) : this.cancel(call);
                }
            });
    }


    edit(call): void {
        this.dialog.open(CallTeamComponent, {
            data: {
                call,
                teamId: this.activatedRoute.snapshot.params.id,
                type: 'edit',
            }
        });
    }

    private apply(call): void {
        this.callService.update({
            creatorConfirmed: +call.creatorId === +this.activatedRoute.snapshot.params.id ? true : undefined,
            opponentConfirmed: +call.opponentId === +this.activatedRoute.snapshot.params.id ? true : undefined,
        }, call.id).subscribe(() => {
            this.callService.updateAll();
            this.showSnackBar(Message.success);
        }, this.onFailed)
    }

    private cancel(call): void {
        this.callService.update({
            creatorConfirmed: +call.creatorId === +this.activatedRoute.snapshot.params.id ? false : undefined,
            opponentConfirmed: +call.opponentId === +this.activatedRoute.snapshot.params.id ? false : undefined,
        }, call.id).subscribe(() => {
            this.callService.updateAll();
            this.showSnackBar(Message.success);
        }, this.onFailed)
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
