import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../types';
import {TeamService} from './team.service';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

    constructor(private teamService: TeamService, private httpClient: HttpClient) {
    }

    getPlayers(): Observable<IUser[]> {
        this.httpClient.get<IUser[]>(UrlAddress.user).subscribe(users => {
            this.data.next(users);
        });
        return this.data.asObservable();
    }

    getPlayerById(id: number): Observable<IUser> {
        return this.httpClient.get<IUser>(`${UrlAddress.user}/${id}`);
    }

    createPlayer(player): Observable<IUser> {
        return this.httpClient.post<IUser>(UrlAddress.user, {
            name: player.name,
            image: player.image,
        });
    }

    updateUser(user: IUser): void {
        this.data.next(this.data.value.concat(user));
    }
}
