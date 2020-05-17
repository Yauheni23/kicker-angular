import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import { ChartTooltipBase } from './chart-tooltip-base';
import { PointObject } from 'highcharts';
import { calcPercent } from 'src/app/helpers/math-helpers';

export class ChartSharedTooltip extends ChartTooltipBase {
  constructor(
    prefix = '$',
    suffix = '',
    percent = false,
  ) {
    super();

    this.formatter = function () {
      if (this.points.length === 0) {
        return false;
      }

      const points: PointObject[] = this.points
        .sort((a, b) => b.y - a.y);
      const total = _.sumBy(points, point => point.y);

      const rows = _.map(points, (point: any) => `
      <tr class="charts-tooltip-item">
        <td class="charts-tooltip-item__description">
          <span class="charts-tooltip-item__color" style="background-color: ${point.series.color}"></span>
          <span class="charts-tooltip-item__title">${point.series.name}</span>
        </td>
        <td class="charts-tooltip-item__value">
          ${prefix + Highcharts.numberFormat(point.y, 0) + suffix}
        </td>
        ${percent ? `<td class="charts-tooltip-item__value charts-tooltip-item__value--right">
          ${Highcharts.numberFormat(calcPercent(point.y, total), 1)}%
        </td>` : ''}
      </tr>`);

      return `
      <div class="charts-tooltip">
        <table class="charts-tooltip__table">
          <thead>
            <tr>
              <th class="charts-tooltip__header charts-tooltip__header--category">${this.x}</th>
              <th class="charts-tooltip__header"></th>
            </tr>
          </thead>
          <tbody>
            ${rows.join('')}
          </tbody>
        </table>
      </div>`;
    };
  }
}
