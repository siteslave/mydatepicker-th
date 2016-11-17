import { IMyDayLabels } from "./my-day-labels.interface";
import { IMyMonthLabels } from "./my-month-labels.interface";
import { IMyDate } from "./my-date.interface";
export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    todayBtnTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    disableUntil?: IMyDate;
    disableSince?: IMyDate;
    disableDays?: Array<IMyDate>;
    disableWeekends?: boolean;
    height?: string;
    width?: string;
    selectionTxtFontSize?: string;
    inline?: boolean;
    alignSelectorRight?: boolean;
    indicateInvalidDate?: boolean;
    showDateFormatPlaceholder?: boolean;
    editableMonthAndYear?: boolean;
    minYear?: number;
    maxYear?: number;
    componentDisabled?: boolean;
}
