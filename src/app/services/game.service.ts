import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IGame} from '../types';
import {gameDefault} from '../constants';

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
