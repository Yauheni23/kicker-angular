import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';
import {serverAddress} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TeamService {
    private data: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);

    constructor(private httpClient: HttpClient) {
    }

    get teams(): ITeam[] {
        return this.data.value;
    }

    getTeams(): Observable<ITeam[]> {
        this.httpClient.get<ITeam[]>(serverAddress + '/team').subscribe(teams => {
            this.data.next(teams);
        });
        return this.data.asObservable();
    }

    getTeamById(id: string): ITeam {
        return this.data.value.find(team => team.id === id);
    }

    createTeam(team: {name: string; image: string}): Observable<any> {
        return this.httpClient.post<ITeam[]>(serverAddress + '/team', {
            name: team.name,
            image: team.image
        });
    }

}
