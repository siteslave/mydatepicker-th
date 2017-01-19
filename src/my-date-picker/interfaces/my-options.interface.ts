import { IMyDayLabels } from "./my-day-labels.interface";
import { IMyMonthLabels } from "./my-month-labels.interface";
import { IMyDate } from "./my-date.interface";
import { IMyDateRange } from "./my-date-range.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    showTodayBtn?: boolean;
    todayBtnTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    markCurrentDay?: boolean;
    disableUntil?: IMyDate;
    disableSince?: IMyDate;
    disableDays?: Array<IMyDate>;
    disableDateRange?: IMyDateRange;
    disableWeekends?: boolean;
    height?: string;
    width?: string;
    selectionTxtFontSize?: string;
    inline?: boolean;
    showClearDateBtn?: boolean;
    alignSelectorRight?: boolean;
    openSelectorTopOfInput?: boolean;
    indicateInvalidDate?: boolean;
    showDateFormatPlaceholder?: boolean;
    customPlaceholderTxt?: string;
    editableDateField?: boolean;
    editableMonthAndYear?: boolean;
    minYear?: number;
    maxYear?: number;
    componentDisabled?: boolean;
    inputValueRequired?: boolean;
    showSelectorArrow?: boolean;
    showInputField?: boolean;
    openSelectorOnInputClick?: boolean;
}
