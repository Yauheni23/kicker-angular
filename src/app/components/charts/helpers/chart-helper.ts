import {SeriesOptions} from 'highcharts';
import * as _ from 'lodash';
import {PeriodsPlotBandsType} from '../enums/periods-plot-bands-type.enum';

interface SeriesTotalFunctions {
  array: (collection: any[]) => number;
  collection: (collection: any[], iteratee: ((value: any) => number) | string) => number;
}

export class ChartHelper {
  static getSeriesTotalFunction(series: SeriesOptions[], type: PeriodsPlotBandsType): (data: any[])  => number {
    const totalFunctions = this.getSeriesTotalFunctionsByType(type);
    const firstItem: any = _.first(_.get(_.first(series), 'data'));

    return firstItem && firstItem.y ? collection => totalFunctions.collection(collection, 'y') : collection => totalFunctions.array(collection);
  }

  private static getSeriesTotalFunctionsByType(type: PeriodsPlotBandsType): SeriesTotalFunctions {
    const totalFunctionsByType = {
      [PeriodsPlotBandsType.Sum]: {
        array: _.sum,
        collection: _.sumBy,
      },
      [PeriodsPlotBandsType.Avg]: {
        array: _.mean,
        collection: _.meanBy,
      }
    };

    return totalFunctionsByType[type];
  }

  static getActiveSeries(series: SeriesOptions[]): SeriesOptions[] {
    return  _.filter(series, seriesItem => this.isSeriesOptionsNonTrend(seriesItem) && seriesItem.visible !== false);
  }

  static getNonTrendSeries(series: SeriesOptions[]): SeriesOptions[] {
    return _.filter(series, seriesItem => this.isSeriesOptionsNonTrend(seriesItem));
  }

  static isSeriesOptionsNonTrend(series: SeriesOptions): boolean {
    return !(series.id && series.id.includes('Trend'));
  }
}
