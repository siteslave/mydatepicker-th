import { IMyDate } from "./my-date.interface";

export interface IMyCalendarDay {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    dayNbr: number;
    disabled: boolean;
}