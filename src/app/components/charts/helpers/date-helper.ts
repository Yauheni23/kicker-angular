import {DateRange} from '../../../types';
import * as moment from 'moment';

export function createPeriodsByWeek(from: string | moment.Moment): DateRange[] {
    const currentDate = moment().endOf('isoWeek');
    const period = [];

    for(let i = moment(from).endOf('isoWeek'); i.isSameOrBefore(currentDate); i = i.clone().add(1, 'week')) {
        const week = {
            from: i.clone().startOf('isoWeek'),
            to: i.clone().endOf('isoWeek'),
        }
        period.push(week);
    }

    return period;
}
