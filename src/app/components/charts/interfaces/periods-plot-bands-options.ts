import * as moment from 'moment';
import { PeriodsPlotBandsType } from '../enums/periods-plot-bands-type.enum';

export interface PeriodsPlotBandsOptions {
  categories: moment.Moment[];
  type: PeriodsPlotBandsType;
  labelPredicate: (total: number) => string;
}
