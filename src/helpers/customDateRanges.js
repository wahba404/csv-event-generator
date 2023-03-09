import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays,
  } from 'date-fns';
  import { createStaticRanges } from "react-date-range";
  
  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  };

  export const defaultInputRanges = [
    {
      label: 'days up to today',
      range(value) {
        return {
          startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
          endDate: defineds.endOfToday,
        };
      },
      getCurrentValue(range) {
        if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
        if (!range.startDate) return '∞';
        return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
      },
    }];
    
  export default function customDateRanges() {
    const customDateRanges = createStaticRanges([
        {
          label: "Yesterday",
          range: () => ({
            startDate: defineds.startOfYesterday,
            endDate: defineds.endOfYesterday,
          }),
        },
        {
            label: 'Last Week',
            range: () => ({
              startDate: defineds.startOfLastWeek,
              endDate: defineds.endOfLastWeek,
            }),
          },
          {
            label: 'Last Month',
            range: () => ({
              startDate: defineds.startOfLastMonth,
              endDate: defineds.endOfLastMonth,
            }),
          },
        ]);

    return customDateRanges;
  }