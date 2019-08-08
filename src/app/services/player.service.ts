import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser, ITeam} from '../types';
import {TeamService} from './team.service';
import {serverAddress} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

    constructor(private teamService: TeamService, private httpClient: HttpClient) {
    }

    getPlayers(): Observable<IUser[]> {
        this.httpClient.get<IUser[]>(serverAddress + '/user').subscribe(users => {
            this.data.next(users);
        });
        return this.data.asObservable();
    }

    getPlayerById(id: string): IUser {
        return this.data.value.find(player => player.id === id);
    }

    getPlayerByTeam(team: ITeam): IUser[] {
        return this.data.value.filter(player => team.users.some(el => el.id === player.id));
    }

    createPlayer(player): any {
        return this.httpClient.post<IUser[]>(serverAddress + '/user', {
            name: player.name,
            image: player.image,
        });
    }

}
