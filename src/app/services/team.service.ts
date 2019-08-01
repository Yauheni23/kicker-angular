import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';

export const teamDefault: ITeam[] = [
    {
        id: '1',
        name: 'Дикари',
        player1: '1',
        player2: '2',
        countGame: 3,
        winGame: 2
    },
    {
        id: '2',
        name: 'Мстители',
        player1: '3',
        player2: '4',
        countGame: 3,
        winGame: 1
    }
];

@Injectable({providedIn: 'root'})
export class TeamService {
    private data: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>(teamDefault);

    public getTeams(): Observable<ITeam[]> {
        return this.data.asObservable();
    }

    public getTeamById(id: string): ITeam {
        return this.data.value.find(team => team.id === id);
    }

    public createTeam(team: ITeam): void {
        if (team) {
            this.data.next(this.data.value.concat(team));
        }
    }

}
