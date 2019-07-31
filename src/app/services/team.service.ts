import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';
import {playerDefault} from './player.service';

export const teamDefault: ITeam[] = [
    {
        id: '1',
        name: 'Дикари',
        player1: playerDefault[0],
        player2: playerDefault[1],
        countGame: 3,
        winGame: 2
    },
    {
        id: '2',
        name: 'Мстители',
        player1: playerDefault[2],
        player2: playerDefault[3],
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
