import {Component} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {TeamService} from '../../services/team.service';
import {ITeam, ITeamUser, IUser} from '../../types';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {Message} from '../../constants';

@Component({
    selector: 'app-team-player-drag-and-drop',
    templateUrl: './team-player-drag-and-drop.component.html',
    styleUrls: ['./team-player-drag-and-drop.component.css']
})
export class TeamPlayerDragAndDropComponent {
    teams: ITeam[] = [];
    players: IUser[] = [];
    disabledTeams = {};
    selectedPlayer: IUser;

    constructor(private playerService: PlayerService,
                private teamService: TeamService,
                public dialog: MatDialog,
                private snackBar: MatSnackBar) {
        this.playerService.getAll().subscribe(players => {
            this.players = players;
        });
        this.teamService.getAll().subscribe(teams => {
            this.teams = teams;
        });

        this.accept = this.accept.bind(this);
    }

    isEnabled(id: number): boolean {
        return !!this.disabledTeams[id];
    }

    dragStart(event: DragEvent, player): void {
        player.teams.forEach(team => {
            this.disabledTeams[team.id] = true;
        });
        this.selectedPlayer = player;
    }

    dragEnd(): void {
        this.disabledTeams = {};
        this.selectedPlayer = undefined;
    }

    dropPlayer(team: ITeam): void {
        if (this.selectedPlayer) {
            this.openDialog(team);
        }
    }

    openDialog(team: ITeam): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                user: this.selectedPlayer,
                team
            }
        });

        dialogRef.afterClosed().subscribe(this.accept);
    }


    private accept(result: ITeamUser): void {
        if (result) {
            this.teamService.addPlayer(result.team.id, result.user.id)
                .subscribe(() => {
                    this.playerService.updateTeams(result.user.id, result.team);
                    this.showSnackBar(Message.success);
                }, this.onFailed);
        }
    }

    private onFailed(): void {
        this.showSnackBar(Message.failed);
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, Message.close, {
            duration: 2000
        });
    }
}
