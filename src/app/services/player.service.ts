import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPlayer} from '../types';

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
    },

];

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>(playerDefault);

    public getPlayers(): Observable<IPlayer[]> {
        return this.data.asObservable();
    }

    public getPlayerById(id: string): IPlayer {
        return this.data.value.find(player => player.id === id);
    }

    public createGame(player: IPlayer): void {
        if (player) {
            this.data.next(this.data.value.concat(player));
        }
    }

}
