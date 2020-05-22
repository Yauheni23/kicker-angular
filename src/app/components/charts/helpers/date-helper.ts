import {DateRange} from '../../../types';
import * as dayjs from 'dayjs';

export function createPeriodsByWeek(from: string | dayjs.Dayjs): DateRange[] {
    const currentDate = dayjs().endOf('isoWeek');
    const period = [];

    for(let i = dayjs(from).endOf('isoWeek'); i.isBefore(currentDate) || i.isSame(currentDate); i = i.clone().add(1, 'week')) {
        const week = {
            from: i.clone().startOf('isoWeek'),
            to: i.clone().endOf('isoWeek'),
        }
        period.push(week);
    }

    return period;
}
