import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { ReportChartOptions } from './report-chart-options';
import { ReportData } from '../interfaces/report-data';
import {DateRange} from '../../../../../types';
import {createPeriodsByWeek} from '../../../helpers/date-helper';

@Injectable()
export class Report {

  data: BehaviorSubject<ReportData> = new BehaviorSubject(null);

  update(data, id, type) {
    const { date } = data.length ? _.minBy(data, item => item.date) : new Date();
    const periods = createPeriodsByWeek(date);
    const {win, lose} = this.getStatistics(data, periods, id, type);
    const chartOptions = this.createChartOptions(win, lose, periods);

    this.data.next({
      chartOptions,
    });
  }

  private createChartOptions(win, lose, periods): ReportChartOptions {
    return new ReportChartOptions({
      win,
      lose,
      date: periods.map(dateRange => dateRange.to),
    });
  }

  getStatistics(data, periods: DateRange[], id, type) {
    const win = _.times(periods.length, _.constant(0));
    const lose = _.times(periods.length, _.constant(0));
    const groupedGame = _.groupBy(data, item => dayjs(item.date).endOf('isoWeek').format('YYYY-MM-DD'));

    periods.forEach((period, index) => {
      const formattedDate = period.to.format('YYYY-MM-DD')
      const winGame = groupedGame[formattedDate]?.filter(type === 'player' ? winPlayerFilter : winTeamFilter) || [];

      win[index] = winGame.length;
      lose[index] = (groupedGame[formattedDate]?.length || 0) - winGame.length;
    })

    return {
      win,
      lose,
    }

    function winTeamFilter(game) {
      return +game.winTeamId === +id;
    }

    function winPlayerFilter(game) {
      return game.winPlayers.some(playerId => +playerId === +id);
    }
  }
}

