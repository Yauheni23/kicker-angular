import {ReportChartOptionsProps} from '../interfaces/report-data-options-props';
import {BaseChartOptions} from '../../../base-chart-options';
import * as _ from 'lodash';
import {ChartSharedTooltip} from '../../../tooltips/chart-shared-tooltip';

export class ReportChartOptions extends BaseChartOptions {
    chart = {
        type: 'column',
        height: 400,
        width: 700,
    };

    legend = {
        enabled: true,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        itemStyle: {
            fontWeight: 'normal'
        },
        y: 10
    };

    title = {
        text: 'Проведенные игры',
        style: {
            fontSize: '27px',
            fontFamily: 'Trebuchet MS, Fira Sans',
            color: '#646974'
        }
    };
    xAxis = {
        lineWidth: 0,
        tickLength: 0,
        labels: {
            enabled: true
        },
        categories: []
    };

    yAxis = {
        title: {
            text: 'Количество, ед',
            offset: 50,
            style: {
                fontSize: '13px',
                fontWeight: 'normal',
                fontFamily: 'Trebuchet MS, Fira Sans',
                color: '#333'
            }
        },
        labels: {
            enabled: true,
        },
        reversedStacks: false,
        tickAmount: 7,
        allowDecimals: false,
    };

    tooltip = new ChartSharedTooltip('', '');

    plotOptions = {
        series: {
            animation: false
        },
        column: {
            borderWidth: 0,
            groupPadding: 0.1,
            size: '100%',
            stacking: 'normal'
        }
    };

    constructor(props: ReportChartOptionsProps) {
        super();

        this.xAxis.categories = props.date.map(date => date.format('DD MMMM YYYY'));

        this.series = [{
            name: 'Победа',
            data: props.win,
            color: 'green'
        }, {
            name: 'Поражение',
            data: _.map(props.lose, losses => - losses),
            color: 'red'
        }];
    }
}
