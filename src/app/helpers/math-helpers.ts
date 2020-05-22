type Percent = number;

export function calcPercent(value: number, totalValue: number, otherwise: any = Infinity): Percent {
  if (totalValue) {
    return 100 * value / totalValue;
  } else {
    return otherwise;
  }
}
