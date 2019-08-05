import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PlayerService} from '../../services/player.service';
import {PlaceColor} from '../../constants';

export interface PlayerData {
  id: string;
  username: string;
  goals: number;
  games: number;
  place: number;
}

@Component({
  selector: 'app-rating-users',
  templateUrl: './rating-users.component.html',
  styleUrls: ['./rating-users.component.css']
})
export class RatingUsersComponent implements OnInit {
  displayedColumns: string[] = ['place', 'username', 'games', 'goals'];
  dataSource: MatTableDataSource<PlayerData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private playerService: PlayerService) {
  }

  public ngOnInit(): void {
    const players = this.playerService.players.map(player => {
      return {
        id: player.id,
        username: player.username,
        goals: player.countGoal,
        games: player.countGame,
      };
    }).sort((prev, next) => {
      return (prev.goals / prev.games || 0) > (next.goals / next.games || 0) ? -1 : 1;
    }).map((player, index) => ({
      ...player,
      place: index + 1
    }));
    this.dataSource = new MatTableDataSource(players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public setColor(id: number): string {
    switch (id) {
      case 1:
        return PlaceColor.First;
      case 2:
        return PlaceColor.Second;
      case 3:
        return PlaceColor.Third;
      default:
        return PlaceColor.Default;
    }
  }
}
