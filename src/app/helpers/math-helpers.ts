import * as _ from 'lodash';

type Percent = number;

export function calcPercentChange(initialValue: number, resultValue: number, precision = 0): Percent {
  if (initialValue) {
    return _.round(100 * (resultValue - initialValue) / initialValue, precision);
  } else {
    return resultValue ? Infinity : 0;
  }
}

export function calcPercentChangeWithNegativeValues(initialValue: number, resultValue: number, precision = 0): Percent {
  if (initialValue) {
    return _.round(100 * (resultValue - initialValue) / Math.abs(initialValue), precision);
  } else {
    return resultValue ? Infinity : 0;
  }
}

export function calcPercent(value: number, totalValue: number, otherwise: any = Infinity): Percent {
  if (totalValue) {
    return 100 * value / totalValue;
  } else {
    return otherwise;
  }
}

export function calcRatio(value: number, totalValue: number, otherwise: any = Infinity): Percent {
  if (totalValue) {
    return value / totalValue;
  } else {
    return otherwise;
  }
}

export function generateRandomNumbers(count: number, min: number, max: number): number[] {
  return _.times(count)
    .map(index => _.random(min, max));
}
