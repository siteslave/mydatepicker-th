import { Injectable } from "@angular/core";
import { IMyDate } from "../interfaces/my-date.interface";
import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMonth } from "../interfaces/my-month.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";

@Injectable()
export class ValidatorService {
    isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRange: IMyDateRange, monthLabels: IMyMonthLabels): IMyDate {
        let daysInMonth: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let isMonthStr: boolean = dateFormat.indexOf("mmm") !== -1;
        let returnDate: IMyDate = {day: 0, month: 0, year: 0};

        if (dateStr.length !== dateFormat.length) {
            return returnDate;
        }

        let separator: string = dateFormat.replace(/[dmy]/g, "")[0];

        let parts: Array<string> = dateStr.split(separator);
        if (parts.length !== 3) {
            return returnDate;
        }

        let day: number = this.parseDatePartNumber(dateFormat, dateStr, "dd");
        let month: number = isMonthStr ? this.parseDatePartMonthName(dateFormat, dateStr, "mmm", monthLabels) : this.parseDatePartNumber(dateFormat, dateStr, "mm");
        let year: number = this.parseDatePartNumber(dateFormat, dateStr, "yyyy");

        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }

            let date: IMyDate = {year: year, month: month, day: day};

            if (this.isDisabledDay(date, disableUntil, disableSince, disableWeekends, disableDays, disableDateRange)) {
                return returnDate;
            }

            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }

            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }

            // Valid date
            return date;
        }
        return returnDate;
    }

    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number {
        for (let key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    }

    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    }

    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number {
        let pos: number = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            let value: string = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value);
        }
        return -1;
    }

    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number {
        let pos: number = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    }

    parseDefaultMonth(monthString: string): IMyMonth {
        let month: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
        if (monthString !== "") {
            let split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    }

    isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRange: IMyDateRange): boolean {
        let dateMs: number = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (disableWeekends) {
            let dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        for (let obj of disableDays) {
            if (obj.year === date.year && obj.month === date.month && obj.day === date.day) {
                return true;
            }
        }

        if (this.isInitializedDate(disableDateRange.begin) && this.isInitializedDate(disableDateRange.end) && dateMs >= this.getTimeInMilliseconds(disableDateRange.begin) && dateMs <= this.getTimeInMilliseconds(disableDateRange.end)) {
            return true;
        }
        return false;
    }

    isInitializedDate(date: IMyDate): boolean {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    }

    getTimeInMilliseconds(date: IMyDate): number {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }

    getDayNumber(date: IMyDate): number {
        let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    }
}