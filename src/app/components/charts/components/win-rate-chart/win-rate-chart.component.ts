import {Component, Input, OnInit} from '@angular/core';
import {Report} from './entities/report';
import {ReportData} from './interfaces/report-data';
import {IGame} from '../../../../types';

@Component({
  selector: 'app-win-rate-chart',
  templateUrl: './win-rate-chart.component.html',
  styleUrls: ['./win-rate-chart.component.styl'],
  providers: [
    Report,
  ],
})
export class WinRateChartComponent implements OnInit {
  @Input() games: IGame[] = [];
  @Input() id: number | string = 0;
  reportData: ReportData;

  constructor(
    private report: Report,
  ) {
  }

  ngOnInit() {
    this.report.update(this.games, this.id);

    this.report.data
      .subscribe(reportData => this.onReportUpdate(reportData));
  }

  private onReportUpdate(reportData: ReportData) {
    this.reportData = reportData;
  }
}
