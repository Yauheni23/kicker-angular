import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPlayer, ITeam} from '../types';
import generateId from 'uuid/v4';

export const playerDefault: IPlayer[] = [
    {
        id: '1',
        username: '4iter',
        countGoal: 243,
        countGame: 100,
        teamId: '1'
    }, {
        id: '2',
        username: 'Mag',
        countGoal: 243,
        countGame: 100,
        teamId: '1'
    }, {
        id: '3',
        username: 'Bond',
        countGoal: 243,
        countGame: 100,
        teamId: '2'
    }, {
        id: '4',
        username: 'Felix',
        countGoal: 243,
        countGame: 100,
        teamId: '2'
    }, {
        id: '5',
        username: 'Stan',
        countGoal: 0,
        countGame: 0,
        teamId: '3'
    }, {
        id: '6',
        username: 'Leha',
        countGoal: 0,
        countGame: 0,
        teamId: '3'
    }, {
        id: '7',
        username: 'Belka',
        countGoal: 0,
        countGame: 0,
    }, {
        id: '8',
        username: 'Solo',
        countGoal: 0,
        countGame: 0,
    }, {
        id: '9',
        username: 'Ram',
        countGoal: 0,
        countGame: 0,
    },

];

@Injectable({providedIn: 'root'})
export class PlayerService {
    private data: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>(playerDefault);

    constructor(private playerService: PlayerService) {
    }

    public getPlayers(): Observable<IPlayer[]> {
        return this.data.asObservable();
    }

    public getPlayerById(id: string): IPlayer {
        return this.data.value.find(player => player.id === id);
    }

    public getFreePlayers(): IPlayer[] {
        return this.data.value.filter(player => !player.teamId);
    }

    public getPlayerByTeam(team: ITeam): IPlayer[] {
        return this.data.value.filter(player => team.players.some(el => el === player.id));
    }

    public createPlayer(player): void {
        const newPlayer = {
            ...player,
            id: generateId(),
            countGame: 0,
            countGoal: 0
        };
        this.data.next(this.data.value.concat(newPlayer));
    }

}
