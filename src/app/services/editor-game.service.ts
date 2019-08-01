import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditorGameService {
    private data: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    public getSelectedTeam(): Observable<string[]> {
        return this.data.asObservable();
    }

    public selectTeam(oldSelectedTeam: string, nextSelectedTeam): void {
        const selectedTeams = this.data.value.filter(teamId => teamId !== oldSelectedTeam);

        this.data.next(selectedTeams.concat(nextSelectedTeam));
    }

}
