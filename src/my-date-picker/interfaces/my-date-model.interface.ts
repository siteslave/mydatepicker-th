import { IMyDate } from "./my-date.interface";

export interface IMyDateModel {
    date: IMyDate;
    jsdate: Object;
    formatted: string;
    epoc: number;
}
