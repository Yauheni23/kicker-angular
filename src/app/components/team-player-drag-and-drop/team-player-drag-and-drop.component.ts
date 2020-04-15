import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { ITeam, ITeamUser, IUser } from '../../types';
import { DialogComponent } from '../dialog/dialog.component';
import { Message, SNACK_BAR_DURATION } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-team-player-drag-and-drop',
    templateUrl: './team-player-drag-and-drop.component.html',
    styleUrls: [ './team-player-drag-and-drop.component.css' ]
})
export class TeamPlayerDragAndDropComponent {
    teams: ITeam[] = [];
    players: IUser[] = [];
    disabledTeams = {};
    selectedPlayer: IUser;

    constructor(private playerService: PlayerService,
                private teamService: TeamService,
                public dialog: MatDialog,
                private snackBar: MatSnackBar,
                private authService: AuthService
    ) {
        this.playerService.getAll()
            .subscribe(players => {
                this.players = players.filter(player => player.id !== this.authService.currentUser.id);
            });
        this.teamService.getAll()
            .subscribe(teams => {
                this.teams = teams.filter(team => team.captainId === this.authService.currentUser.id);
            });

        this.accept = this.accept.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    isEnabled(id: string): boolean {
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
                user: this.selectedPlayer, team
            }
        });

        dialogRef.afterClosed()
            .subscribe(this.accept);
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
            duration: SNACK_BAR_DURATION
        });
    }
}
