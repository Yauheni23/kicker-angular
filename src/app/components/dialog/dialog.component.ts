import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TeamPlayerDragAndDropComponent} from '../team-player-drag-and-drop/team-player-drag-and-drop.component';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TeamPlayerDragAndDropComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
