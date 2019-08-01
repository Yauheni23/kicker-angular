import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITeam} from '../types';
import {TeamService} from './team.service';

@Injectable({
    providedIn: 'root'
})
export class EditorGameService {
    public teamsAll: ITeam[] = [];
    public availableTeams: BehaviorSubject<ITeam[]> = new BehaviorSubject([]);
    private selectedTeams: string[] = [];

    constructor(private teamService: TeamService) {
        this.teamService.getTeams().subscribe(data => {
            this.teamsAll = data;
            this.filterTeams();
        });
    }

    public getTeams(): Observable<ITeam[]> {
        return this.availableTeams.asObservable();
    }

    public selectTeam(oldSelectedTeam: string, nextSelectedTeam: string): void {
        this.selectedTeams = this.selectedTeams.filter(teamId => teamId !== oldSelectedTeam).concat(nextSelectedTeam);
        this.filterTeams();
    }

    private filterTeams(): void {
        let teams = this.teamsAll;
        this.selectedTeams.forEach(selectedTeam => {
            teams = teams.filter(team => {
                return team.id !== selectedTeam;
            });
        });
        this.availableTeams.next(teams);
    }

}
