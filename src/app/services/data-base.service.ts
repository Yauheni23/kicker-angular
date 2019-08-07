import {Injectable} from '@angular/core';
import {IGame, IUser, ITeam} from '../types';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {serverAddress} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor(private httpClient: HttpClient) {
    }

    getUsers(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(serverAddress + '/user');
    }

    createUser(user): Observable<any> {
        return this.httpClient.post<IGame[]>(serverAddress + '/user', user);
    }

    getTeams(): Observable<ITeam[]> {
        return this.httpClient.get<ITeam[]>(serverAddress + '/team');
    }

    getGames(): Observable<IGame[]> {
        return this.httpClient.get<IGame[]>(serverAddress + '/game');
    }


}
