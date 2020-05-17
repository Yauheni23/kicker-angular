import * as _ from 'lodash';

export class TrendFactory {
  static generateTrendLine(initialSeriesData: number[]): number[] {
    const indexes = _.range(initialSeriesData.length);
    const indexesSum = _.sum(indexes);
    const valuesSum = _.sum(initialSeriesData);
    const incline = TrendFactory.calcTrendIncline(initialSeriesData, indexes, indexesSum, valuesSum);
    const initialValue = TrendFactory.calcTrendInitialValue(incline, indexes, indexesSum, valuesSum);

    return _.map(indexes, index => incline * index + initialValue);
  }

  private static calcTrendIncline(sourceSeriesData: number[], indexes: number[], indexesSum: number, valuesSum: number): number {
    const indexesSquareSum = _.reduce(indexes, (sum, value) => {
        return sum + (value * value);
      }, 0),
      indexesValuesMultiplicationSum = _.reduce(
        sourceSeriesData,
        (sum: number, value: number, index: number) => sum + (value * index),
        0,
      );

    return (indexes.length * indexesValuesMultiplicationSum - indexesSum * valuesSum) /
      (indexes.length * indexesSquareSum - indexesSum * indexesSum);
  }

  private static calcTrendInitialValue(incline: number, indexes: number[], indexesSum: number, valuesSum: number): number {
    return (valuesSum - incline * indexesSum) / indexes.length;
  }
}
