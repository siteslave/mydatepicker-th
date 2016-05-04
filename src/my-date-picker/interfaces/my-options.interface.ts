import {IMyDayLabels} from "./my-day-labels.interface";
import {IMyMonthLabels} from "./my-month-labels.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    todayBtnTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    height?: string;
    width?: string;
}