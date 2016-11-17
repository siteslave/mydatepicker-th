import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewEncapsulation, Renderer } from "@angular/core";
import { IMyDate, IMyMonth, IMyWeek, IMyDayLabels, IMyMonthLabels, IMyOptions } from "./interfaces/index";
import { LocaleService } from "./services/my-date-picker.locale.service";
import { ValidatorService } from "./services/my-date-picker.validator.service";

// webpack1_
declare var require: any;
const myDpStyles: string = require("./my-date-picker.component.css");
const myDpTpl: string = require("./my-date-picker.component.html");
// webpack2_

@Component({
    selector: "my-date-picker",
    styles: [myDpStyles],
    template: myDpTpl,
    providers: [LocaleService, ValidatorService],
    encapsulation: ViewEncapsulation.None
})

export class MyDatePicker implements OnChanges {
    @Input() options: any;
    @Input() locale: string;
    @Input() defaultMonth: string;
    @Input() selDate: string;
    @Output() dateChanged: EventEmitter<Object> = new EventEmitter();

    showSelector: boolean = false;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedDate: IMyDate = {year: 0, month: 0, day: 0};
    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = "";
    invalidDate: boolean = false;
    dayIdx: number = 0;
    today: Date = null;

    editMonth: boolean = false;
    invalidMonth: boolean = false;
    editYear: boolean = false;
    invalidYear: boolean = false;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    // Default options
    opts: IMyOptions = {
        dayLabels: <IMyDayLabels> {},
        monthLabels: <IMyMonthLabels> {},
        dateFormat: <string> "",
        todayBtnTxt: <string> "",
        firstDayOfWeek: <string> "",
        sunHighlight: <boolean>true,
        disableUntil: <IMyDate> {year: 0, month: 0, day: 0},
        disableSince: <IMyDate> {year: 0, month: 0, day: 0},
        disableDays: <Array<IMyDate>> [],
        disableWeekends: <boolean> false,
        height: <string> "34px",
        width: <string> "100%",
        selectionTxtFontSize: <string> "18px",
        inline: <boolean> false,
        alignSelectorRight: <boolean> false,
        indicateInvalidDate: <boolean> false,
        showDateFormatPlaceholder: <boolean> false,
        editableMonthAndYear: <boolean> true,
        minYear: <number> 1000,
        maxYear: <number> 9999,
        componentDisabled: <boolean> false
    };

    constructor(public elem: ElementRef, private renderer: Renderer, private localeService: LocaleService, private validatorService: ValidatorService) {
        this.setLocaleOptions();

        this.today = new Date();
        renderer.listenGlobal("document", "click", (event: any) => {
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
            }
            if (this.opts.editableMonthAndYear && event.target && this.elem.nativeElement.contains(event.target)) {
                this.resetMonthYearEdit();
            }
        });
    }

    setLocaleOptions(): void {
        let opts: IMyOptions = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((k) => {
            (<IMyOptions>this.opts)[k] = opts[k];
        });
    }

    setOptions(): void {
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((k) => {
                (<IMyOptions>this.opts)[k] = this.options[k];
            });
        }
        if (this.opts.minYear < 1000) {
            this.opts.minYear = 1000;
        }
        if (this.opts.maxYear > 9999) {
            this.opts.minYear = 9999;
        }
    }

    resetMonthYearEdit(): void {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    }

    editMonthClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    }

    editYearClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    }

    userDateInput(event: any): void {
        this.invalidDate = false;
        if (event.target.value.length === 0) {
            this.removeBtnClicked();
        }
        else {
            let date: IMyDate = this.validatorService.isDateValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.monthLabels);
            if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                this.selectDate({day: date.day, month: date.month, year: date.year});
            }
            else {
                this.invalidDate = true;
            }
        }
    }

    userMonthInput(event: any): void {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidMonth = false;

        let m: number = this.validatorService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year};
            this.generateCalendar(m, this.visibleMonth.year);
        }
        else {
            this.invalidMonth = true;
        }
    }

    userYearInput(event: any): void {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidYear = false;

        let y: number = this.validatorService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y};
            this.generateCalendar(this.visibleMonth.monthNbr, y);
        }
        else {
            this.invalidYear = true;
        }
    }

    parseOptions(): void {
        this.setOptions();
        if (this.locale) {
            this.setLocaleOptions();
        }

        let days: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.dayIdx = days.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < days.length; i++) {
                this.weekDays.push(this.opts.dayLabels[days[idx]]);
                idx = days[idx] === "sa" ? 0 : idx + 1;
            }
        }
        if (this.opts.inline) {
            this.openBtnClicked();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("locale")) {
            this.locale = changes["locale"].currentValue;
        }

        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
        }

        this.weekDays.length = 0;
        this.parseOptions();

        if (changes.hasOwnProperty("defaultMonth")) {
            this.selectedMonth = this.parseSelectedMonth((changes["defaultMonth"].currentValue).toString());
        }

        if (changes.hasOwnProperty("selDate")) {
            this.selectionDayTxt = changes["selDate"].currentValue;
            if (this.selectionDayTxt !== "") {
                this.selectedDate = this.parseSelectedDate(this.selectionDayTxt);
            }
            else {
                this.removeBtnClicked();
            }
        }
    }

    removeBtnClicked(): void {
        this.selectionDayTxt = "";
        this.selectedDate = {year: 0, month: 0, day: 0};
        this.dateChanged.emit({date: {}, formatted: this.selectionDayTxt, epoc: 0});
        this.invalidDate = false;
    }

    openBtnClicked(): void {
        this.showSelector = !this.showSelector;

        if (this.showSelector || this.opts.inline) {
            let y: number = 0, m: number = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                    y = this.today.getFullYear();
                    m = this.today.getMonth() + 1;
                } else {
                    y = this.selectedMonth.year;
                    m = this.selectedMonth.monthNbr;
                }
            }
            else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            // Set current month
            this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};

            // Create current month
            this.generateCalendar(m, y);
        }
    }

    prevMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    nextMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    prevYear(): void {
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear(): void {
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    todayClicked(): void {
        // Today selected
        let m: number = this.today.getMonth() + 1;
        let y: number = this.today.getFullYear();
        this.selectDate({day: this.today.getDate(), month: m, year: y});
        if (this.opts.inline) {
            this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
            this.generateCalendar(m, y);
        }
    }

    cellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
        this.resetMonthYearEdit();
    }

    selectDate(date: any): void {
        this.selectedDate = {day: date.day, month: date.month, year: date.year};
        this.selectionDayTxt = this.formatDate(this.selectedDate);
        this.showSelector = false;
        this.dateChanged.emit({
            date: this.selectedDate,
            formatted: this.selectionDayTxt,
            epoc: Math.round(this.getTimeInMilliseconds(this.selectedDate) / 1000.0)
        });
        this.invalidDate = false;
    }

    preZero(val: string): string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? "0" + val : val;
    }

    formatDate(val: any): string {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        let formatted: string = this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        return this.opts.dateFormat.indexOf("mmm") !== -1 ? formatted.replace("mmm", this.monthText(val.month)) : formatted.replace("mm", this.preZero(val.month));
    }

    monthText(m: number): string {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: any): boolean {
        // Check is a given date the current date
        return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
    }

    isDisabledDay(date: IMyDate): boolean {
        // Check is a given date <= disabledUntil or given date >= disabledSince or disabled weekend
        let givenDate: number = this.getTimeInMilliseconds(date);
        if (this.opts.disableUntil.year !== 0 && this.opts.disableUntil.month !== 0 && this.opts.disableUntil.day !== 0 && givenDate <= this.getTimeInMilliseconds(this.opts.disableUntil)) {
            return true;
        }
        if (this.opts.disableSince.year !== 0 && this.opts.disableSince.month !== 0 && this.opts.disableSince.day !== 0 && givenDate >= this.getTimeInMilliseconds(this.opts.disableSince)) {
            return true;
        }
        if (this.opts.disableWeekends) {
            let dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        for (let obj of this.opts.disableDays) {
            if (obj.year === date.year && obj.month === date.month && obj.day === date.day) {
                return true;
            }
        }
        return false;
    }

    getTimeInMilliseconds(date: IMyDate): number {
        return this.getDate(date.year, date.month, date.day).getTime();
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number): void {
        this.dates.length = 0;
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: IMyWeek[] = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                }

                cmo = this.CURR_MONTH;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    let date: IMyDate = {year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    }

    parseSelectedDate(ds: string): IMyDate {
        let date: IMyDate = {day: 0, month: 0, year: 0};
        if (ds !== "") {
            date.day = this.validatorService.parseDatePartNumber(this.opts.dateFormat, ds, "dd");

            date.month = this.opts.dateFormat.indexOf("mmm") !== -1
                ? this.validatorService.parseDatePartMonthName(this.opts.dateFormat, ds, "mmm", this.opts.monthLabels)
                : this.validatorService.parseDatePartNumber(this.opts.dateFormat, ds, "mm");

            date.year = this.validatorService.parseDatePartNumber(this.opts.dateFormat, ds, "yyyy");
        }
        return date;
    }

    parseSelectedMonth(ms: string): IMyMonth {
        return this.validatorService.parseDefaultMonth(ms);
    }
}
