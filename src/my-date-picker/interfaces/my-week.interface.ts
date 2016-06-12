import {IMyDate} from "./my-date.interface";

export interface IMyWeek {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    sun: boolean;
    disabled: boolean;
}