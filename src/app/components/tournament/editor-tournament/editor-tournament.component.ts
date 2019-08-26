import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../../services/tournament.service';
import {ITournament} from '../../../types';

@Component({
    selector: 'app-editor-tournament',
    templateUrl: './editor-tournament.component.html',
    styleUrls: ['./editor-tournament.component.css']
})
export class EditorTournamentComponent implements OnInit {
    tournament: ITournament;

    constructor(private route: ActivatedRoute, private tournamentService: TournamentService) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.tournamentService.getById(id).subscribe(tournament => {
            this.tournament = tournament;
        });
    }

}
