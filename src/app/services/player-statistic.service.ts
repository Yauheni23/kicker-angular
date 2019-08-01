import {BehaviorSubject, Observable} from 'rxjs';

export interface IStatisticPlayer {
    id: number;
    maxGoals: number;
}

export class PlayerStatisticService {
    public maxGoals: number;
    private maxGoalsByPlayers: BehaviorSubject<IStatisticPlayer[]> = new BehaviorSubject([]);

    public getMaxGoals(): Observable<IStatisticPlayer[]> {
        return this.maxGoalsByPlayers.asObservable();
    }

    public setMaxGoals(countGoals: number): void {
        this.maxGoals = countGoals;
        const maxGoalsByPlayers = this.maxGoalsByPlayers.value.map(el => ({
            ...el,
            maxGoals: this.maxGoals
        }));
        this.maxGoalsByPlayers.next(maxGoalsByPlayers);
    }

    public setCountPlayers(countPlayers: number): void {
        const maxGoalsByPlayers = [];
        for (let i = 0; i < countPlayers; i++) {
            maxGoalsByPlayers.push({
                id: maxGoalsByPlayers.length,
                maxGoals: this.maxGoals || 0
            });
        }
        this.maxGoalsByPlayers.next(maxGoalsByPlayers);
    }

    public setPlayerGoals(playerStatistic: IStatisticPlayer): void {
        const maxGoalsByPlayers = this.maxGoalsByPlayers.value.filter(el => el.id !== playerStatistic.id);
        maxGoalsByPlayers[0].maxGoals = this.maxGoals - playerStatistic.maxGoals;
        maxGoalsByPlayers.push(playerStatistic);

        this.maxGoalsByPlayers.next(maxGoalsByPlayers);
    }
}
