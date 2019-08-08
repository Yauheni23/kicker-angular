import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IGame} from '../types';
import {serverAddress} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GameService {
    private data: BehaviorSubject<IGame[]> = new BehaviorSubject<IGame[]>([]);

    constructor(private httpClient: HttpClient) {
    }

    get games(): IGame[] {
        return this.data.value;
    }

    public getGames(): Observable<IGame[]> {
        this.httpClient.get<IGame[]>(serverAddress + '/game').subscribe(games => {
            this.data.next(games);
        });
        return this.data.asObservable();
    }

    public createGame(data): Observable<any> {
        return this.httpClient.post(serverAddress + '/game', {
            date: new Date(),
            teams: [data.team1, data.team2],
            users: [data.team1.player1, data.team1.player2, data.team2.player1, data.team2.player2]
        });
    }
}
