import * as _ from 'lodash';
import { ChartObject, DataPoint, IndividualSeriesOptions, SeriesObject, SeriesOptions } from 'highcharts';
import { BaseChartOptions } from './base-chart-options';
import { TrendFactory } from './factories/trend.factory';
import { ChartHelper } from './helpers/chart-helper';

type SeriesData = Array<number | [number, number] | [string, number] | [string, number, number] | [number, number, number] | DataPoint>;

export class TrendChartOptions extends BaseChartOptions {

  series: SeriesOptions[];

  protected emptyTrendSeries: SeriesOptions = {
    type: 'line',
    name: 'Trend',
    id: 'Trend',
    color: '#ff8c8c',
    animation: false,
    marker: {
      enabled: false,
    },
    enableMouseTracking: false,
  };

  protected visibleSeries: SeriesOptions[] = [];

  protected updateTrend = (chart: ChartObject) => {
    if (this.isSeriesNeedsToUpdate()) {
      this.updateVisibleSeries();
      this.replaceTrendSeries(chart.series);
    }
  };

  private isSeriesNeedsToUpdate(): boolean {
    return this.visibleSeries.length !== this.getActiveSeries().length;
  }

  protected replaceTrendSeries(chartSeries: SeriesObject[]) {
    chartSeries
      .find(series => series.options.id === 'Trend')
      .update({
        ...<IndividualSeriesOptions>this.emptyTrendSeries,
        data: this.updateTrendSeriesData(),
      }, true);
  }

  protected updateTrendSeriesData: () => SeriesData = () => {
    return this.createTrendSeries(this.visibleSeries).data;
  };

  protected initTrendUpdating() {
    this.chart.events = {
      ...this.chart.events,
      redraw: this.createRedraw(),
    };

    this.updateVisibleSeries();

    this.series.push({
      ...this.emptyTrendSeries,
      data: this.updateTrendSeriesData(),
    });
  }

  protected updateVisibleSeries() {
    this.visibleSeries = this.getActiveSeries();
  }

  protected getActiveSeries(): SeriesOptions[] {
    return ChartHelper.getActiveSeries(this.series);
  }

  protected getNonTrendSeries() {
    return ChartHelper.getNonTrendSeries(this.series);
  }

  protected createRedraw(): (event: Event) => void {
    const oldRedraw = this.chart.events && this.chart.events.redraw;
    const updateTrend = this.updateTrend;

    return function (event) {
      updateTrend(this);

      if (oldRedraw) {
        oldRedraw(event);
      }
    };
  }

  private createTrendSeries(chartSeries: SeriesOptions[]): SeriesOptions {
    const trendSeries = _.clone(this.emptyTrendSeries);

    trendSeries.data = this.getResultTrendSeriesData(this.getStackedTrendSeriesData(chartSeries));

    return trendSeries;
  }

  protected getStackedTrendSeriesData(chartSeries: SeriesOptions[]): number[] {
    return chartSeries.reduce((stackedData, series) => series.data.map(
      (item: any, index) => this.getSeriesDataPointValue(item) + _.get(stackedData, index, 0),
    ), []);
  }

  protected getSeriesDataPointValue(item: DataPoint | number): number {
    return typeof item === 'number' ? item : item.y;
  }

  protected getResultTrendSeriesData(initialSeriesData: number[]): number[] {
    return TrendFactory.generateTrendLine(initialSeriesData);
  }
}
