import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { IUser } from '../../types';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UserFormGroup } from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../forms/change-password/change-password.component';


@Component({
    selector: 'app-profile', templateUrl: './profile.component.html', styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
    player: IUser;
    formGroup: FormGroup;

    constructor(
        private playerService: PlayerService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog
    ) {
        this.formGroup = new FormGroup({
            image: new FormControl('')
        });
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.playerService.getById(params.id)
                .subscribe(user => {
                    this.player = user;

                    this.image.setValue(this.player.image);
                });
        });
    }

    get isEditEnabled() {
        return this.authService.currentUser?.id === this.player?.id;
    }

    get games() {
        return this.player ? this.player.games : [];
    }

    get goals() {
        return this.games.length ? this.games.reduce((accumulator, game) => accumulator + game.goals, 0) : 0;
    }

    get image(): AbstractControl {
        return this.formGroup.get(UserFormGroup.image);
    }

    get isNewImage() {
        return this.player.image !== this.image.value;
    }

    update() {
        if (!this.formGroup.valid) {
            return;
        }

        const formGroupValue = this.formGroup.value;

        this.playerService.updateUser(this.authService.currentUser.id, {
            image: formGroupValue.image,
        }).subscribe(() => {
            this.playerService.getById(this.player.id)
                .subscribe(user => {
                    this.player = user;

                    this.image.setValue(this.player.image);
                });
        });
    }

    changePassword() {
        this.dialog.open(ChangePasswordComponent, {
            data: {
                updatePassword: data => this.playerService.updateUser(this.authService.currentUser.id, data)
            }
        });
    }
}
