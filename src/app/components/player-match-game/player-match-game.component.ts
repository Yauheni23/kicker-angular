import { Component, OnInit, Input } from '@angular/core';
import {IPlayer} from '../../types';

@Component({
  selector: 'app-player-match-game',
  templateUrl: './player-match-game.component.html',
  styleUrls: ['./player-match-game.component.css']
})
export class PlayerMatchGameComponent implements OnInit {
  @Input() public player: IPlayer;

  constructor() { }

  ngOnInit() {
  }

}
