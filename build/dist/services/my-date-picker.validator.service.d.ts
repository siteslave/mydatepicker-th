import { IMyDate } from "../interfaces/my-date.interface";
import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMonth } from "../interfaces/my-month.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
export declare class ValidatorService {
    isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRange: IMyDateRange, monthLabels: IMyMonthLabels, enableDays: Array<IMyDate>): IMyDate;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    parseDefaultMonth(monthString: string): IMyMonth;
    isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRange: IMyDateRange, enableDays: Array<IMyDate>): boolean;
    isInitializedDate(date: IMyDate): boolean;
    getTimeInMilliseconds(date: IMyDate): number;
    getDayNumber(date: IMyDate): number;
}
