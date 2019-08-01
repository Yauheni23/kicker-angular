import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';
import generateId from 'uuid/v4';


export const teamDefault: ITeam[] = [
    {
        id: '1',
        name: 'Дикари',
        players: ['1', '2'],
        countGame: 3,
        winGame: 2
    },
    {
        id: '2',
        name: 'Мстители',
        players: ['3', '4'],
        countGame: 3,
        winGame: 1
    },
    {
        id: '3',
        name: 'Драконы',
        players: ['5', '6'],
        countGame: 0,
        winGame: 0
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
            const newTeam = {
                ...team,
                id: generateId(),
                countGame: 0,
                winGame: 0
            };
            this.data.next(this.data.value.concat(newTeam));
        }
    }

}
