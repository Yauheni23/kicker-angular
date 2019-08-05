import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPlayer, ITeam} from '../types';
import generateId from 'uuid/v4';
import {TeamService} from './team.service';
import {playerDefault} from '../constants';

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>(playerDefault);

    constructor(private teamService: TeamService) {
    }

    get players(): IPlayer[] {
        return this.data.value;
    }

    public getPlayers(): Observable<IPlayer[]> {
        return this.data.asObservable();
    }

    public getPlayerById(id: string): IPlayer {
        return this.data.value.find(player => player.id === id);
    }

    public getFreePlayers(): IPlayer[] {
        // @ts-ignore
        const playersFromTeam = this.teamService.teams.filter(el => el.players).map(el => el.players).flat();
        let freePlayers = this.data.value;
        playersFromTeam.forEach(el => {
            freePlayers = freePlayers.filter(player => player.id !== el);
        });
        return freePlayers;
    }

    public getPlayerByTeam(team: ITeam): IPlayer[] {
        return this.data.value.filter(player => team.players.some(el => el === player.id));
    }

    public createPlayer(player): any {
        return new Promise(((resolve, reject) => {
            if (!player) {
                reject({
                    message: 'Data is invalid'
                });
                return;
            }
            if (this.players.some(el => el.username === player.username)) {
                reject({
                    message: 'Name is busy!'
                });
            } else {
                const newPlayer = {
                    ...player,
                    id: generateId(),
                    countGame: 0,
                    countGoal: 0
                };
                this.data.next(this.data.value.concat(newPlayer));
                resolve({ok: true});
            }
        }));
    }

}
