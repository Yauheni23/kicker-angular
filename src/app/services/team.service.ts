import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';
import generateId from 'uuid/v4';
import {teamDefault} from '../constants';

@Injectable({providedIn: 'root'})
export class TeamService {
    private data: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>(teamDefault);

    public getTeams(): Observable<ITeam[]> {
        return this.data.asObservable();
    }

    get teams(): ITeam[] {
        return this.data.value;
    }

    public getTeamById(id: string): ITeam {
        return this.data.value.find(team => team.id === id);
    }

    public createTeam(team): any {
        return new Promise(((resolve, reject) => {
            if (!team) {
                reject({
                    message: 'Data is invalid'
                });
                return;
            }
            if (this.teams.some(el => el.name === team.name)) {
                reject({
                    message: 'Name is busy!'
                });
            } else {
                const newTeam = {
                    name: team.name,
                    players: [team.player1, team.player2],
                    id: generateId(),
                    countGame: 0,
                    winGame: 0
                };
                this.data.next(this.data.value.concat(newTeam));
                resolve({ok: true});
            }
        }));
    }

}
