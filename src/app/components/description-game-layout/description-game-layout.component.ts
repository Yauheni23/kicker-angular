import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-description-game-layout',
    templateUrl: './description-game-layout.component.html',
    styleUrls: ['./description-game-layout.component.css']
})
export class DescriptionGameLayoutComponent implements OnInit {
    @Input() game;

    constructor() {
    }

    ngOnInit() {
    }

}
