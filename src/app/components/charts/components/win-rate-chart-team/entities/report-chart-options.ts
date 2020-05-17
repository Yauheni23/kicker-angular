import {ReportChartOptionsProps} from '../interfaces/report-chart-options-props';
import * as _ from 'lodash';
import {BaseChartOptions} from '../../../base-chart-options';
import {ChartSharedTooltip} from '../../../tooltips/chart-shared-tooltip';
import {calcPercent} from '../../../../../helpers/math-helpers';

export class ReportChartOptions extends BaseChartOptions {
    tooltip = new ChartSharedTooltip('', '%');
    chart = {
        height: 450,
        width: 700,
    };

    yAxis = [
        {
            max: 100,
            min: 0,
            labels: {
                style: {
                    fontSize: '11px',
                    fontWeight: 'normal',
                    fontFamily: 'Trebuchet MS, Fira Sans',
                    color: '#646974',
                },
            },
            stackLabels: {
                enabled: true,
                style: {
                    color: '#646974',
                    fontWeight: 'bold',
                    fontSize: '11px',
                },
            },
            title: {
                text: 'Процент побед, %',
            },
        },
    ];
    plotOptions = {
        line: {
            marker: {
                symbol: 'circle',
                radius: 4,
            },
        },
        series: {
            cursor: 'pointer',
            animation: false,
        }
    };
    title = {
        text: 'Процент побед игроков',
        style: {
            fontSize: '27px',
            fontFamily: 'Trebuchet MS, Fira Sans',
            color: '#646974'
        }
    };

    constructor(props: ReportChartOptionsProps) {
        super();

        this.xAxis[0].categories = props.periods.map(date => date.to.format('DD MMMM YYYY'));

        this.series = _.map(props.statistics, (statistics, team) => {

            return {
                name: team,
                data: statistics.map(item => calcPercent(item.win, item.total, 0)),
            };
        });
    }

    private randomWinRate() {
        return Math.round(Math.random() * 100);
    }
}
