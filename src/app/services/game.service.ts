import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IGame} from '../types';
import {teamDefault} from './team.service';

const gameDefault: IGame[] = [
    {
        id: '1',
        team1: teamDefault[0],
        team2: teamDefault[1],
        winTeam: teamDefault[0],
        goalTeam1: 11,
        goalTeam2: 6
    }, {
        id: '2',
        team1: teamDefault[0],
        team2: teamDefault[1],
        winTeam: teamDefault[0],
        goalTeam1: 11,
        goalTeam2: 9
    }, {
        id: '3',
        team1: teamDefault[0],
        team2: teamDefault[1],
        winTeam: teamDefault[1],
        goalTeam1: 8,
        goalTeam2: 11
    },
];

@Injectable({providedIn: 'root'})
export class GameService {
    private data: BehaviorSubject<IGame[]> = new BehaviorSubject<IGame[]>(gameDefault);

    public getGames(): Observable<IGame[]> {
        return this.data.asObservable();
    }

    public getGameById(id: string): IGame {
        return this.data.value.find(game => game.id === id);
    }

    public createGame(game: IGame): void {
        if (game) {
            this.data.next(this.data.value.concat(game));
        }
    }

}
