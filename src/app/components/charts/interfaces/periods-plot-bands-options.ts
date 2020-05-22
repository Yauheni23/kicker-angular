import * as dayjs from 'dayjs';
import { PeriodsPlotBandsType } from '../enums/periods-plot-bands-type.enum';

export interface PeriodsPlotBandsOptions {
  categories: dayjs.Dayjs[];
  type: PeriodsPlotBandsType;
  labelPredicate: (total: number) => string;
}
