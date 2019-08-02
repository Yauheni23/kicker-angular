import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IGame} from '../types';
import {gameDefault} from '../constants';
import generateId from 'uuid/v4';

@Injectable({providedIn: 'root'})
export class GameService {
    private data: BehaviorSubject<IGame[]> = new BehaviorSubject<IGame[]>(gameDefault);

    public getGames(): Observable<IGame[]> {
        return this.data.asObservable();
    }

    public getGameById(id: string): IGame {
        return this.data.value.find(game => game.id === id);
    }

    public createGame(game): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!game) {
                reject({
                    message: 'Data is invalid'
                });
                return;
            }
            const isValidCountGoal = ((game.team1.countGoals !== game.team2.countGoals)
                && (game.team1.countGoals === 10 || game.team2.countGoals === 10));
            if (!isValidCountGoal) {
                reject({
                    message: 'Goals is invalid'
                });
                return;
            }
            const newGame = {
                id: generateId(),
                team1: game.team1.name,
                team2: game.team2.name,
                goalTeam1: game.team1.countGoals,
                goalTeam2: game.team2.countGoals,
                goalsStatistics: {
                    team1Player1: game.team1.playersStatistics.goalsPlayer1,
                    team1Player2: game.team1.playersStatistics.goalsPlayer2,
                    team2Player1: game.team2.playersStatistics.goalsPlayer1,
                    team2Player2: game.team2.playersStatistics.goalsPlayer2
                }
            };

            this.data.next(this.data.value.concat(newGame));
            resolve({
                ok: true
            });
        });
    }

}
