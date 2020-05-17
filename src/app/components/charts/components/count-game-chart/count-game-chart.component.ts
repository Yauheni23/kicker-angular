import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Report} from './entities/report';
import {ReportData} from './interfaces/report-data';
import {IGame} from '../../../../types';

@Component({
    selector: 'app-count-game-chart',
    templateUrl: './count-game-chart.component.html',
    styleUrls: ['./count-game-chart.component.styl'],
    providers: [Report]
})
export class CountGameChartComponent implements OnInit, OnChanges {
    @Input() games: IGame[] = [];
    @Input() id: number | string = 0;
    @Input() type = 'player';
    data: ReportData;

    constructor(private report: Report) {
    }

    ngOnInit() {
        this.report.update(this.games, this.id, this.type);

        this.report.data
            .subscribe(reportData => this.data = reportData);
    }

   ngOnChanges(changes): void {
       this.report.update(this.games, this.id, this.type);
   }
}
