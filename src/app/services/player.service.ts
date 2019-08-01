import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPlayer, ITeam} from '../types';

export const playerDefault: IPlayer[] = [
    {
        id: '1',
        username: '4iter',
        countGoal: 243,
        countGame: 100
    }, {
        id: '2',
        username: 'Mag',
        countGoal: 243,
        countGame: 100
    }, {
        id: '3',
        username: 'Bond',
        countGoal: 243,
        countGame: 100
    }, {
        id: '4',
        username: 'Felix',
        countGoal: 243,
        countGame: 100
    }, {
        id: '5',
        username: 'Stan',
        countGoal: 0,
        countGame: 0
    }, {
        id: '6',
        username: 'Leha',
        countGoal: 0,
        countGame: 0
    },

];

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>(playerDefault);

    constructor(private playerService: PlayerService) {}

    public getPlayers(): Observable<IPlayer[]> {
        return this.data.asObservable();
    }

    public getPlayerById(id: string): IPlayer {
        return this.data.value.find(player => player.id === id);
    }

    public getPlayerByTeam(team: ITeam): IPlayer[] {
        return this.data.value.filter(player => player.id === team.player1 || player.id === team.player2);
    }

    public createGame(player: IPlayer): void {
        if (player) {
            this.data.next(this.data.value.concat(player));
        }
    }

}
