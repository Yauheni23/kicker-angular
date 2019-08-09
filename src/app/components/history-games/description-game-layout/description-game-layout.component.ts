import {Component, Input} from '@angular/core';
import {MAX_GOALS} from '../../../constants';

@Component({
    selector: 'app-description-game-layout',
    templateUrl: './description-game-layout.component.html',
    styleUrls: ['./description-game-layout.component.css']
})
export class DescriptionGameLayoutComponent {
    readonly maxGoals = MAX_GOALS;
    @Input() game;
}
