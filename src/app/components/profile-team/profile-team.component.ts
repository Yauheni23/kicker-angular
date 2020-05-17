import {Component, OnInit} from '@angular/core';
import {IGame, ITeam} from '../../types';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {UserFormGroup} from '../../constants';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/game.service';
import {TeamService} from '../../services/team.service';


@Component({
    selector: 'app-profile-team', templateUrl: './profile-team.component.html', styleUrls: ['./profile-team.component.css']
})
export class ProfileTeamComponent implements OnInit {
    team: ITeam;
    games: IGame[]
    formGroup: FormGroup;

    constructor(
        private teamService: TeamService,
        private gameService: GameService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.formGroup = new FormGroup({
            image: new FormControl('')
        });
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.gameService.getByTeam(params.id)
                .subscribe(games => {
                    this.games = games
                });

            this.teamService.getById(params.id)
                .subscribe(team => {
                    this.team = team;

                    this.image.setValue(this.team.image);
                });
        });
    }

    get isEditEnabled() {
        return this.authService.currentUser?.id === this.team?.captainId;
    }

    get goals() {
        return this.team?.games?.length ? this.team.games.reduce((accumulator, game: any) => accumulator + game.goals, 0) : 0;
    }

    get image(): AbstractControl {
        return this.formGroup.get(UserFormGroup.image);
    }

    get isNewImage() {
        return this.team.image !== this.image.value;
    }

    update() {
        if (!this.formGroup.valid) {
            return;
        }

        const formGroupValue = this.formGroup.value;

        this.teamService.updateTeam(this.team.id, {
            image: formGroupValue.image,
        }).subscribe(() => {
            this.gameService.getByTeam(this.team.id)
                .subscribe(games => {
                    this.games = games
                });

            this.teamService.getById(this.team.id)
                .subscribe(team => {
                    this.team = team;

                    this.image.setValue(this.team.image);
                });
        });
    }
}
