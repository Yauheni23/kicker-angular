import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from '../../types';
import {goalsVariant} from '../../constants';
import {PlayerStatisticService} from '../../services/player-statistic.service';

@Component({
    selector: 'app-player-match-game',
    templateUrl: './player-match-game.component.html',
    styleUrls: ['./player-match-game.component.css']
})
export class PlayerMatchGameComponent implements OnInit {
    @Input() public player: IPlayer;
    @Input() public id: number;
    public maxGoals: number;

    constructor(private playerStatisticService: PlayerStatisticService) {
    }

    public ngOnInit(): void {
        this.playerStatisticService.getMaxGoals().subscribe(data => {
            this.maxGoals = data.find(el => el.id === this.id).maxGoals;
        });
    }

    get goalsArray(): number[] {
        return goalsVariant.slice(0, this.maxGoals + 1);
    }

    public setGoals(countGoals: number): void {
        this.playerStatisticService.setPlayerGoals({
            id: this.id,
            maxGoals: countGoals
        });
    }
}
