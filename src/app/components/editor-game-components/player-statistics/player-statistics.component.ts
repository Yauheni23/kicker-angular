import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {goalsVariant} from '../../../constants';
import {IUser} from '../../../types';
import {PlayerService} from '../../../services/player.service';

@Component({
    selector: 'app-player-statistics',
    templateUrl: './player-statistics.component.html',
    styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent {
    readonly variantGoals: number[] = goalsVariant;
    @Input() formGroupPlayer: FormGroup;
    @Input() goals: number = 0;
    id: number;
    userGG: IUser;

    constructor(private playerService: PlayerService) {
    }

    get availableGoals(): number[] {
        return this.variantGoals.slice(0, this.goals);
    }

    get playerId(): number {
        return this.formGroupPlayer.get('id').value;
    }

    get player(): IUser {
        if (this.playerId && this.playerId !== this.id) {
            this.id = this.playerId;
            this.playerService.getPlayerById(this.playerId).subscribe(data => {
                this.userGG = data;
            });
        }
        if (!this.playerId) {
            this.userGG = undefined;
            this.id = undefined;
        }

        return this.userGG;
    }

    get goalsControl(): AbstractControl {
        return this.formGroupPlayer.get('goals');
    }

    deleteUser(): void {
        this.userGG = undefined;
        this.id = undefined;
        this.formGroupPlayer.get('id').reset();
    }
}
