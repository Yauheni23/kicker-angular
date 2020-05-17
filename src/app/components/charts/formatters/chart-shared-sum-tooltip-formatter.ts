import * as _ from 'lodash';

export function chartSharedSumTooltipFormatter(): string {
  if (this.points.length === 0) {
    return;
  }

  const category = this.x;
  const value = _.sumBy(this.points, point => point['y']);

  return `<div class="charts-tooltip">
    ${category}: <span class="charts-tooltip__value">${value}</span>
    </div>`;
}
