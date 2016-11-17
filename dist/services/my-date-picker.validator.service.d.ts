import { IMyDate } from "../interfaces/my-date.interface";
import { IMyMonth } from "../interfaces/my-month.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
export declare class ValidatorService {
    isDateValid(date: string, dateFormat: string, minYear: number, maxYear: number, monthLabels: IMyMonthLabels): IMyDate;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    parseDefaultMonth(monthString: string): IMyMonth;
}
