import {
  AxisOptions,
  ChartOptions,
  CreditsOptions,
  LegendOptions,
  Options,
  PlotOptions,
  SeriesOptions,
  TitleOptions,
  TooltipOptions,
} from 'highcharts';
import { chartSharedSumTooltipFormatter } from './formatters/chart-shared-sum-tooltip-formatter';
import { PeriodsPlotBandsOptions } from './interfaces/periods-plot-bands-options';

export class BaseChartOptions implements Options {

  chart: ChartOptions = {
    height: 370,
  };

  legend: LegendOptions;

  credits: CreditsOptions = {
    enabled: false,
  };

  colors: string[] = [
    '#88ca5b',
    '#ffb141',
    '#ca70c9',
    '#ff8787',
    '#2da9c7',
    '#9984dd',
    '#7ac0f5',
  ];

  tooltip: TooltipOptions = {
    animation: false,
    useHTML: true,
    backgroundColor: 'white',
    shared: true,
    style: {
      padding: 0,
    },
    formatter: chartSharedSumTooltipFormatter,
  };

  plotOptions: PlotOptions = {
    series: {
      animation: false,
      cursor: '',
    },
    pie: {},
    bar: {},
    line: {
      marker: {
        symbol: 'circle',
        radius: 4,
      },
    },
    areaspline: {
      marker: {
        symbol: 'circle',
        radius: 3,
      },
    },
    spline: {
      marker: {
        symbol: 'circle',
        radius: 3,
      },
    },
    area: {
      marker: {
        symbol: 'circle',
        radius: 3,
      },
    },
  };

  series: SeriesOptions[] = [];

  title: TitleOptions = {
    text: null,
    style: {
      fontSize: '27px',
      fontFamily: 'Trebuchet MS, Fira Sans',
      color: '#646974',
    },
  };

  yAxis: AxisOptions[] | AxisOptions = [
    {
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
        text: null,
      },
    },
  ];

  xAxis: AxisOptions[] | AxisOptions = [
    {
      categories: [],
      labels: {
        autoRotation: [0],
      },
    },
  ];

  periodsPlotBandsOptions: PeriodsPlotBandsOptions;
}

export const baseChartOptions = new BaseChartOptions();
