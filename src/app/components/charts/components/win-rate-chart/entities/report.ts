import {Injectable} from '@angular/core';
import {ReportData} from '../interfaces/report-data';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import {ReportChartOptions} from './report-chart-options';
import {createPeriodsByWeek} from '../../../helpers/date-helper';
import {DateRange} from '../../../../../types';
import * as moment from 'moment';

@Injectable()
export class Report {
    data: BehaviorSubject<ReportData> = new BehaviorSubject(null);

    update(routeData: any, id) {
        const { date } = routeData.length ? _.minBy(routeData, item => item.date) : new Date();
        const periods = createPeriodsByWeek(date);
        const statistics = this.getStatistics(routeData, periods, id);
        this.data.next({
            chartOptions: new ReportChartOptions({statistics, periods}),
        });
    }

    getStatistics(games, periods: DateRange[], id) {
        const gameByTeam = {
            All: _.times(periods.length,_.constant(0)).map(() => ({win: 0, total: 0}))
        };
        const teamNames = _(games)
            .map(game => game.team1.players.some(player => player.id === id) ? game.team1.name : game.team2.name)
            .uniq()
            .value();

        teamNames.forEach( name => gameByTeam[name] = _.times(periods.length,_.constant(0)).map(() => ({win: 0, total: 0})));

        periods.forEach((period, index) => {
            const gamesUnderDate = games.filter(game => period.to.isSameOrAfter(moment(game.date)));

            gamesUnderDate.forEach(game => {
                const team = game.team1.players.some(player => player.id === id) ? game.team1 : game.team2;

                if (game.winTeamId === team.id) {
                    gameByTeam[team.name][index].win++;
                    gameByTeam.All[index].win++;
                }

                gameByTeam[team.name][index].total++;
                gameByTeam.All[index].total++;
            })
        })

        return gameByTeam;
    }
}
