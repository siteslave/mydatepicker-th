import { IMyDate } from '../interfaces/my-date.interface';
import { IMyMonthLabels } from '../interfaces/my-month-labels.interface';
export declare class ValidatorService {
    isDateValid(date: string, dateFormat: string, minYear: number, maxYear: number): IMyDate;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
}
