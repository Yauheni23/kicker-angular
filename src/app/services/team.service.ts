import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {ITeam, IUser} from '../types';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';
import {EditorService} from './editor';

@Injectable({providedIn: 'root'})
export class TeamService extends EditorService<ITeam> {
    myTeams: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);

    constructor(protected httpClient: HttpClient) {
        super(httpClient, UrlAddress.team);
    }

    addPlayer(teamId: string, userId: string): Observable<any> {
        return this.httpClient.post<ITeam[]>(UrlAddress.addUser, {
            teamId, userId
        });
    }

    getUserTeams(id: string): Observable<any> {
        return this.httpClient.get<ITeam[]>(`${UrlAddress.teamsUser}/${id}`);
    }
}
