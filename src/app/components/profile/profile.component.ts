import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {IGame, IUser} from '../../types';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {UserFormGroup} from '../../constants';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordComponent} from '../forms/change-password/change-password.component';
import {GameService} from '../../services/game.service';


@Component({
    selector: 'app-profile', templateUrl: './profile.component.html', styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    player: IUser;
    games: IGame[]
    formGroup: FormGroup;

    constructor(
        private playerService: PlayerService,
        private gameService: GameService,
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
            this.gameService.getByUser(params.id)
                .subscribe(games => {
                    this.games = games
                });

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

    get goals() {
        return this.player?.games?.length ? this.player.games.reduce((accumulator, game) => accumulator + game.goals, 0) : 0;
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
                    this.authService.update(user);

                    this.image.setValue(this.player.image);
                });
            this.gameService.getByUser(this.player.id)
                .subscribe(games => {
                    this.games = games
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
