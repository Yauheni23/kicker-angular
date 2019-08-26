import {Component, Input} from '@angular/core';
import {ClassName, MAX_GOALS} from '../../../constants';

@Component({
    selector: 'app-description-game-layout',
    templateUrl: './description-game-layout.component.html',
    styleUrls: ['./description-game-layout.component.css']
})
export class DescriptionGameLayoutComponent {
    @Input() game;

    isWin(goals: number): string {
        return goals === MAX_GOALS ? ClassName.isWin : ClassName.isLose;
    }
}
