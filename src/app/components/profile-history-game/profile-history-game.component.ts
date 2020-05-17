import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {ActivatedRoute} from '@angular/router';
import {IGame} from '../../types';
import {AuthService} from '../../services/auth.service';
import {ClassName, MAX_GOALS} from '../../constants';

@Component({
    selector: 'app-profile-history-game',
    templateUrl: './profile-history-game.component.html',
    styleUrls: ['./profile-history-game.component.css']
})
export class ProfileHistoryGameComponent {
    @Input() games: IGame[] = [];

    isWin(goals: number): string {
        return goals === MAX_GOALS ? ClassName.isWin : ClassName.isLose;
    }
}
