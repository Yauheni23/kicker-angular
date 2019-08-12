import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IGame} from '../types';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GameService {
    private data: BehaviorSubject<IGame[]> = new BehaviorSubject<IGame[]>([]);

    constructor(private httpClient: HttpClient) {
    }

    get games(): IGame[] {
        return this.data.value;
    }

    getGames(): Observable<IGame[]> {
        this.httpClient.get<IGame[]>(UrlAddress.game).subscribe(games => {
            this.data.next(games);
        });
        return this.data.asObservable();
    }

    createGame(data): Observable<IGame> {
        return this.httpClient.post<IGame>(UrlAddress.game, {
            date: new Date(),
            teams: [data.team1, data.team2],
            users: [data.team1.player1, data.team1.player2, data.team2.player1, data.team2.player2]
        });
    }
}
