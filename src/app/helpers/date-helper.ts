import * as moment from 'moment';
import {DateRange} from '../types';

export function isBetweenDateRange(date: moment.Moment, dateRange: DateRange): boolean {
    return date.isBetween(dateRange.from, dateRange.to, 'days', '[]');
}
