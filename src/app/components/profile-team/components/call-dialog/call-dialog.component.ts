import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ProfileTeamComponent} from '../../profile-team.component';


@Component({
    selector: 'app-dialog', templateUrl: './call-dialog.component.html', styleUrls: [ './call-dialog.component.css' ]
})
export class CallDialogComponent {
    constructor(public dialogRef: MatDialogRef<ProfileTeamComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
