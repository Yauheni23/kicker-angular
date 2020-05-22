import {Injectable} from '@angular/core';
import {ReportData} from '../interfaces/report-data';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import {ReportChartOptions} from './report-chart-options';
import {createPeriodsByWeek} from '../../../helpers/date-helper';
import {DateRange} from '../../../../../types';
import * as dayjs from 'dayjs';

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
        const gameByUser = {
            All: _.times(periods.length,_.constant(0)).map(() => ({win: 0, total: 0}))
        };
        const userNames = _(games)
            .map(game => game.team1.id === id
                ? game.team1.players.map(player => player.name)
                : game.team2.players.map(player => player.name)
            )
            .flatten()
            .uniq()
            .value();

        userNames.forEach(name => gameByUser[name] = _.times(periods.length,_.constant(0)).map(() => ({win: 0, total: 0})));

        periods.forEach((period, index) => {
            const gamesUnderDate = games.filter(game => period.to.isAfter(dayjs(game.date)) ||  period.to.isSame(dayjs(game.date)));

            gamesUnderDate.forEach(game => {
                const team = game.team1.id === id ? game.team1 : game.team2;

                if (game.winTeamId === team.id) {
                    gameByUser[team.players[0].name][index].win++;
                    gameByUser[team.players[1].name][index].win++;
                    gameByUser.All[index].win++;
                }

                gameByUser[team.players[0].name][index].total++;
                gameByUser[team.players[1].name][index].total++;
                gameByUser.All[index].total++;
            })
        })

        return gameByUser;
    }
}
