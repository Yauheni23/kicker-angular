import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {DisplayedColumns, MAX_GOALS} from '../../../constants';
import {ITeam} from '../../../types';
import {Rating} from '../rating';

@Component({
    selector: 'app-rating-teams',
    templateUrl: './rating-teams.component.html',
    styleUrls: ['./rating-teams.component.css']
})
export class RatingTeamsComponent extends Rating<ITeam> implements OnInit {
    displayedColumns: string[] = DisplayedColumns.ratingTeams;

    constructor(private teamService: TeamService) {
        super(teamService);
        this.mapTeams = this.mapTeams.bind(this);
    }

    protected changeData(data: ITeam[]): ITeam[] {
        return data.map(this.mapTeams).sort(this.sortCountGames).sort(this.sortWinRate).map(this.mapPlace);
    }

    private mapTeams(team): ITeam {
        return {
            id: team.id,
            name: team.name,
            users: team.users,
            image: team.image,
            captainId: team.captainId,
            games: team.games.length,
            goals: team.games.reduce((accumulator, currentGame) => accumulator + currentGame.goals, 0),
            winRate: team.games.filter(game => game.goals === MAX_GOALS).length / team.games.length || 0
        };
    }

    private sortWinRate(current: ITeam, next: ITeam): number {
        return current.winRate > next.winRate ? -1 : 1;
    }

    private sortCountGames(current: ITeam, next: ITeam): number {
        return current.games > next.games ? -1 : 1;
    }

    private mapPlace(team: ITeam, index: number): ITeam {
        return {
            ...team,
            place: index + 1
        };
    }
}
