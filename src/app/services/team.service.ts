import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ITeam, IUser} from '../types';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';
import {EditorService} from './editor';

@Injectable({providedIn: 'root'})
export class TeamService extends EditorService<ITeam> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, UrlAddress.team);
    }

    addPlayer(teamId: string, userId: string): Observable<any> {
        return this.httpClient.post<ITeam[]>(UrlAddress.addUser, {
            teamId, userId
        });
    }
}
