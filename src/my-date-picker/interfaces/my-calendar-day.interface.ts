import { IMyDate } from "./my-date.interface";
import { IMyMarkedDate } from "./my-marked-date.interface";

export interface IMyCalendarDay {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    dayNbr: number;
    disabled: boolean;
    markedDate: IMyMarkedDate;
}