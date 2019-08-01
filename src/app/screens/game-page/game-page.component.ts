import {Component} from '@angular/core';
import {EditorGameService} from '../../services/editor-game.service';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
    constructor(private editorGameService: EditorGameService) {
        this.editorGameService.clear();
    }

}
