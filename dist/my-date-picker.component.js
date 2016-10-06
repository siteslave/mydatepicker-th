"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var my_date_picker_locale_service_1 = require('./services/my-date-picker.locale.service');
var my_date_picker_validator_service_1 = require('./services/my-date-picker.validator.service');
var MyDatePicker = (function () {
    function MyDatePicker(elem, renderer, localeService, validatorService) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.localeService = localeService;
        this.validatorService = validatorService;
        this.dateChanged = new core_1.EventEmitter();
        this.showSelector = false;
        this.visibleMonth = { monthTxt: '', monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: '', monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.selectionDayTxt = '';
        this.invalidDate = false;
        this.dayIdx = 0;
        this.today = null;
        this.editMonth = false;
        this.invalidMonth = false;
        this.editYear = false;
        this.invalidYear = false;
        this.PREV_MONTH = 1;
        this.CURR_MONTH = 2;
        this.NEXT_MONTH = 3;
        this.dayLabels = {};
        this.monthLabels = {};
        this.dateFormat = '';
        this.todayBtnTxt = '';
        this.firstDayOfWeek = '';
        this.sunHighlight = true;
        this.height = '34px';
        this.width = '100%';
        this.selectionTxtFontSize = '18px';
        this.disableUntil = { year: 0, month: 0, day: 0 };
        this.disableSince = { year: 0, month: 0, day: 0 };
        this.disableWeekends = false;
        this.inline = false;
        this.alignSelectorRight = false;
        this.indicateInvalidDate = true;
        this.showDateFormatPlaceholder = false;
        this.editableMonthAndYear = true;
        this.minYear = 1000;
        this.maxYear = 9999;
        this.setLocaleOptions();
        this.today = new Date();
        renderer.listenGlobal('document', 'click', function (event) {
            if (_this.showSelector && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.showSelector = false;
            }
            if (_this.editableMonthAndYear && event.target && _this.elem.nativeElement.contains(event.target)) {
                _this.resetMonthYearEdit();
            }
        });
    }
    MyDatePicker.prototype.setLocaleOptions = function () {
        var options = this.localeService.getLocaleOptions(this.locale);
        for (var prop in options) {
            if (options[prop] instanceof Object) {
                (this)[prop] = JSON.parse(JSON.stringify(options[prop]));
            }
            else {
                (this)[prop] = options[prop];
            }
        }
    };
    MyDatePicker.prototype.setOptions = function () {
        var options = ['dayLabels', 'monthLabels', 'dateFormat', 'todayBtnTxt', 'firstDayOfWeek', 'sunHighlight', 'disableUntil', 'disableSince', 'disableWeekends', 'height', 'width', 'selectionTxtFontSize', 'inline', 'alignSelectorRight', 'indicateInvalidDate', 'showDateFormatPlaceholder', 'editableMonthAndYear', 'minYear', 'maxYear'];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var prop = options_1[_i];
            if (this.options && (this.options)[prop] !== undefined && (this.options)[prop] instanceof Object) {
                (this)[prop] = JSON.parse(JSON.stringify((this.options)[prop]));
            }
            else if (this.options && (this.options)[prop] !== undefined) {
                (this)[prop] = (this.options)[prop];
            }
        }
        if (this.minYear < 1000) {
            this.minYear = 1000;
        }
        if (this.maxYear > 9999) {
            this.minYear = 9999;
        }
    };
    MyDatePicker.prototype.resetMonthYearEdit = function () {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    };
    MyDatePicker.prototype.editMonthClicked = function (event) {
        event.stopPropagation();
        if (this.editableMonthAndYear) {
            this.editMonth = true;
        }
    };
    MyDatePicker.prototype.editYearClicked = function (event) {
        event.stopPropagation();
        if (this.editableMonthAndYear) {
            this.editYear = true;
        }
    };
    MyDatePicker.prototype.userDateInput = function (event) {
        this.invalidDate = false;
        if (event.target.value.length === 0) {
            this.removeBtnClicked();
        }
        else {
            var date = this.validatorService.isDateValid(event.target.value, this.dateFormat, this.minYear, this.maxYear);
            if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                this.selectDate({ day: date.day, month: date.month, year: date.year });
            }
            else {
                this.invalidDate = true;
            }
        }
    };
    MyDatePicker.prototype.userMonthInput = function (event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidMonth = false;
        var m = this.validatorService.isMonthLabelValid(event.target.value, this.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year };
            this.generateCalendar(m, this.visibleMonth.year);
        }
        else {
            this.invalidMonth = true;
        }
    };
    MyDatePicker.prototype.userYearInput = function (event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidYear = false;
        var y = this.validatorService.isYearLabelValid(Number(event.target.value), this.minYear, this.maxYear);
        if (y !== -1) {
            this.editYear = false;
            this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y };
            this.generateCalendar(this.visibleMonth.monthNbr, y);
        }
        else {
            this.invalidYear = true;
        }
    };
    MyDatePicker.prototype.parseOptions = function () {
        this.setOptions();
        if (this.locale) {
            this.setLocaleOptions();
        }
        var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.dayIdx = days.indexOf(this.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < days.length; i++) {
                this.weekDays.push(this.dayLabels[days[idx]]);
                idx = days[idx] === 'sa' ? 0 : idx + 1;
            }
        }
        if (this.inline) {
            this.openBtnClicked();
        }
    };
    MyDatePicker.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('selDate')) {
            this.selectionDayTxt = changes['selDate'].currentValue;
            this.selectedDate = this.parseSelectedDate(this.selectionDayTxt);
        }
        if (changes.hasOwnProperty('defaultMonth')) {
            this.selectedMonth = this.parseSelectedMonth((changes['defaultMonth'].currentValue).toString());
        }
        if (changes.hasOwnProperty('locale')) {
            this.locale = changes['locale'].currentValue;
        }
        if (changes.hasOwnProperty('options')) {
            this.options = changes['options'].currentValue;
        }
        this.weekDays.length = 0;
        this.parseOptions();
    };
    MyDatePicker.prototype.removeBtnClicked = function () {
        this.selectionDayTxt = '';
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.dateChanged.emit({ date: {}, formatted: this.selectionDayTxt, epoc: 0 });
        this.invalidDate = false;
    };
    MyDatePicker.prototype.openBtnClicked = function () {
        this.showSelector = !this.showSelector;
        if (this.showSelector || this.inline) {
            var y = 0, m = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                    y = this.today.getFullYear();
                    m = this.today.getMonth() + 1;
                }
                else {
                    y = this.selectedMonth.year;
                    m = this.selectedMonth.monthNbr;
                }
            }
            else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
            this.generateCalendar(m, y);
        }
    };
    MyDatePicker.prototype.prevMonth = function () {
        var m = this.visibleMonth.monthNbr;
        var y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y);
    };
    MyDatePicker.prototype.nextMonth = function () {
        var m = this.visibleMonth.monthNbr;
        var y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        }
        else {
            m++;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y);
    };
    MyDatePicker.prototype.prevYear = function () {
        if (this.visibleMonth.year - 1 < this.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    };
    MyDatePicker.prototype.nextYear = function () {
        if (this.visibleMonth.year + 1 > this.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    };
    MyDatePicker.prototype.todayClicked = function () {
        var m = this.today.getMonth() + 1;
        var y = this.today.getFullYear();
        this.selectDate({ day: this.today.getDate(), month: m, year: y });
        if (this.inline) {
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
            this.generateCalendar(m, y);
        }
    };
    MyDatePicker.prototype.cellClicked = function (cell) {
        if (cell.cmo === this.PREV_MONTH) {
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            this.nextMonth();
        }
        this.resetMonthYearEdit();
    };
    MyDatePicker.prototype.selectDate = function (date) {
        this.selectedDate = { day: date.day, month: date.month, year: date.year };
        this.selectionDayTxt = this.formatDate(this.selectedDate);
        this.showSelector = false;
        this.dateChanged.emit({ date: this.selectedDate, formatted: this.selectionDayTxt, epoc: Math.round(this.getTimeInMilliseconds(this.selectedDate) / 1000.0) });
        this.invalidDate = false;
    };
    MyDatePicker.prototype.preZero = function (val) {
        return parseInt(val) < 10 ? '0' + val : val;
    };
    MyDatePicker.prototype.formatDate = function (val) {
        return this.dateFormat.replace('yyyy', val.year)
            .replace('mm', this.preZero(val.month))
            .replace('dd', this.preZero(val.day));
    };
    MyDatePicker.prototype.monthText = function (m) {
        return this.monthLabels[m];
    };
    MyDatePicker.prototype.monthStartIdx = function (y, m) {
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDatePicker.prototype.daysInMonth = function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    MyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        return this.daysInMonth(m, y);
    };
    MyDatePicker.prototype.isCurrDay = function (d, m, y, cmo) {
        return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
    };
    MyDatePicker.prototype.isDisabledDay = function (date) {
        var givenDate = this.getTimeInMilliseconds(date);
        if (this.disableUntil.year !== 0 && this.disableUntil.month !== 0 && this.disableUntil.day !== 0 && givenDate <= this.getTimeInMilliseconds(this.disableUntil)) {
            return true;
        }
        if (this.disableSince.year !== 0 && this.disableSince.month !== 0 && this.disableSince.day !== 0 && givenDate >= this.getTimeInMilliseconds(this.disableSince)) {
            return true;
        }
        if (this.disableWeekends) {
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        return false;
    };
    MyDatePicker.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    MyDatePicker.prototype.getDayNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    };
    MyDatePicker.prototype.sundayIdx = function () {
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDatePicker.prototype.generateCalendar = function (m, y) {
        this.dates.length = 0;
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var pm = dInPrevM - monthStart + 1;
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: y, month: m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date) });
                }
                cmo = this.CURR_MONTH;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date) });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    var date = { year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date) });
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    };
    MyDatePicker.prototype.parseSelectedDate = function (ds) {
        var date = { day: 0, month: 0, year: 0 };
        if (ds !== '') {
            var fmt = this.options && this.options.dateFormat !== undefined ? this.options.dateFormat : this.dateFormat;
            var dpos = fmt.indexOf('dd');
            if (dpos >= 0) {
                date.day = parseInt(ds.substring(dpos, dpos + 2));
            }
            var mpos = fmt.indexOf('mm');
            if (mpos >= 0) {
                date.month = parseInt(ds.substring(mpos, mpos + 2));
            }
            var ypos = fmt.indexOf('yyyy');
            if (ypos >= 0) {
                date.year = parseInt(ds.substring(ypos, ypos + 4));
            }
        }
        return date;
    };
    MyDatePicker.prototype.parseSelectedMonth = function (ms) {
        var split = ms.split(ms.match(/[^0-9]/)[0]);
        return (parseInt(split[0]) > parseInt(split[1])) ?
            { monthTxt: '', monthNbr: parseInt(split[1]), year: parseInt(split[0]) } :
            { monthTxt: '', monthNbr: parseInt(split[0]), year: parseInt(split[1]) };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MyDatePicker.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MyDatePicker.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MyDatePicker.prototype, "defaultMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MyDatePicker.prototype, "selDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MyDatePicker.prototype, "dateChanged", void 0);
    MyDatePicker = __decorate([
        core_1.Component({
            selector: 'my-date-picker',
            styles: [".mydp{min-width:100px;border-radius:2px;line-height:1.1;display:inline-block;position:relative}.mydp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.mydp .selector{margin-top:2px;margin-left:-1px;position:absolute;width:262px;padding:3px;border-radius:2px;background-color:#DDD;z-index:100}.mydp .alignselectorright{right:-1px}.mydp .selectiongroup{position:relative;display:table;border:none;background-color:#FFF}.mydp .selection{background-color:#FFF;display:table-cell;position:absolute;width:100%;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.mydp .invaliddate,.mydp .invalidmonth,.mydp .invalidyear{background-color:#F1DEDE}.mydp ::-ms-clear{display:none}.mydp .headerbtn,.mydp .selbtngroup{display:table-cell;vertical-align:middle}.mydp .selbtngroup{position:relative;white-space:nowrap;width:1%;text-align:right;font-size:0}.mydp .btnclear,.mydp .btnpicker{height:100%;width:30px;border:none;border-left:1px solid #AAA;padding:0;cursor:pointer;outline:0;font:inherit;-moz-user-select:none}.mydp .btnclear,.mydp .btnpicker,.mydp .headertodaybtn{background:#FFF}.mydp .header{width:100%;height:36px;margin-bottom:1px;background-color:#FAFAFA}.mydp .header td{vertical-align:middle;border:none}.mydp .currday div,.mydp .selectedday div{border:1px solid #004198}.mydp .header td:nth-child(1){font-size:16px;padding-left:4px}.mydp .header td:nth-child(2){text-align:center}.mydp .header td:nth-child(3){font-size:16px;padding-right:4px}.mydp .caltable{table-layout:fixed;width:100%;background-color:#FFF;font-size:14px}.mydp .caltable,.mydp .caltable td,.mydp .caltable th{border-collapse:collapse;color:#036;line-height:1.1}.mydp .caltable td,.mydp .caltable th{padding:5px;text-align:center}.mydp .caltable th{background-color:#DDD;font-size:12px;vertical-align:middle}.mydp .caltable td{cursor:pointer;font-weight:700;height:28px}.mydp .caltable td div{background-color:inherit;height:18px;vertical-align:middle}.mydp .caltable td div span{vertical-align:middle}.mydp .inlinedp{position:relative}.mydp .nextmonth,.mydp .prevmonth{color:#CCC}.mydp .disabled{cursor:default!important;color:#CCC!important;background:#FFEBE6!important}.mydp .sunday{color:#C30000}.mydp .sundayDim{opacity:.5}.mydp .currmonth{background-color:#F6F6F6;font-weight:700}.mydp .selectedday div{background-color:#8EBFFF!important;border-radius:0}.mydp .selectmenu{height:24px;width:60px}.mydp .headerbtn{background-color:#FAFAFA;cursor:pointer}.mydp,.mydp .caltable tbody,.mydp .header,.mydp .headertodaybtn,.mydp .monthinput,.mydp .selector,.mydp .yearinput{border:1px solid #AAA}.mydp .btnclear,.mydp .btnpicker,.mydp .headerbtn,.mydp .headermonthtxt,.mydp .headertodaybtn,.mydp .headeryeartxt,.mydp .selection{color:#000}.mydp .headertodaybtn{padding:0 4px;border-radius:2px;cursor:pointer;font-size:11px;min-width:60px;height:22px}.mydp button::-moz-focus-inner{border:0}.mydp .headermonthtxt,.mydp .headeryeartxt{min-width:40px;text-align:center;display:table-cell;vertical-align:middle;font-size:14px}.mydp .headermonthtxt span,.mydp .headeryeartxt span{vertical-align:middle}.mydp .btnclear:focus,.mydp .btnpicker:focus{background:#ADD8E6}.mydp .icon-calendar,.mydp .icon-cross{font-size:16px}.mydp .icon-left,.mydp .icon-right{color:#222;font-size:16px;vertical-align:middle}.mydp table{display:table}.mydp table td{padding:0}.mydp .btnclear:hover,.mydp .btnpicker:hover,.mydp .headertodaybtn:hover,.mydp .tablesingleday:hover{background-color:#8BDAF4}.mydp .monthlabel,.mydp .yearlabel{cursor:pointer}.mydp .monthinput,.mydp .yearinput{width:40px;height:22px;text-align:center;font-weight:700;outline:0;border-radius:2px}.mydp .headerbtn span:hover{color:#8BDAF4}.mydp .monthlabel:hover,.mydp .yearlabel:hover{color:#8BDAF4;font-weight:700}@font-face{font-family:mydatepicker;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SAssAAAC8AAAAYGNtYXDMUczTAAABHAAAAGxnYXNwAAAAEAAAAYgAAAAIZ2x5ZmFQ1q4AAAGQAAABbGhlYWQGZuTFAAAC/AAAADZoaGVhB4IDyQAAAzQAAAAkaG10eBYAAnAAAANYAAAAIGxvY2EBdAE0AAADeAAAABJtYXhwABUAPgAAA4wAAAAgbmFtZQ5R9RkAAAOsAAABnnBvc3QAAwAAAAAFTAAAACAAAwOaAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmBwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAUAAAABAAEAADAAAAAQAg5gDmAuYF5gf//f//AAAAAAAg5gDmAuYF5gf//f//AAH/4xoEGgMaARoAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAMAEAAAAPAA4AABAAJAA4AEwAYAB0AIgAnACwAMQA2ADsAABMRMxEjFyE1IRUDITUhFQERMxEjJRUzNSMTFTM1IzMVMzUjMxUzNSMBFTM1IzMVMzUjMxUzNSMTFTM1I0Bzc0ADAP0AQAOA/IADDXNz/ZOAgCCAgMCAgMCAgP6AgIDAgIDAgIAggIADAP1AAsBzc3P9c3NzAwD9QALAgMDA/sCAgICAgID/AICAgICAgAJAwMAAAAAAAgBwADADkANQAAQACQAANwEnARcDATcBB+kCp3n9WXl5Aqd5/Vl5MAKnef1ZeQKn/Vl5Aqd5AAABAOAAAAMgA4AAAwAAAQMBJQMgA/3DASADgPyAAcPfAAEA4AAAAyADgAADAAA3EwEF4AMCPf7gAAOA/j3fAAAAAQAAAAEAAF0/BsNfDzz1AAsEAAAAAADRxFAkAAAAANHEUCQAAAAAA8ADgAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADwAABAAAAAAAAAAAAAAAAAAAACAQAAAAAAAAAAAAAAAIAAAAEAABABAAAcAQAAOAEAADgAAAAAAAKABQAHgB6AJYApgC2AAAAAQAAAAgAPAAMAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAkAAAABAAAAAAACAAcAcgABAAAAAAADAAkAPAABAAAAAAAEAAkAhwABAAAAAAAFAAsAGwABAAAAAAAGAAkAVwABAAAAAAAKABoAogADAAEECQABABIACQADAAEECQACAA4AeQADAAEECQADABIARQADAAEECQAEABIAkAADAAEECQAFABYAJgADAAEECQAGABIAYAADAAEECQAKADQAvHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclJlZ3VsYXIAUgBlAGcAdQBsAGEAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAckZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('truetype');font-weight:400;font-style:normal}.mydp .icon{font-family:mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mydp .icon-calendar:before{content:\"\\e600\"}.mydp .icon-cross:before{content:\"\\e602\"}.mydp .icon-left:before{content:\"\\e605\"}.mydp .icon-right:before{content:\"\\e607\"}"],
            template: "<div class=\"mydp\" [ngStyle]=\"{'height': height, 'width': width, 'border': inline ? 'none' : '1px solid #AAA'}\"><div class=\"selectiongroup\" *ngIf=\"!inline\"><input type=\"text\" class=\"selection\" maxlength=\"10\" [ngClass]=\"{'invaliddate': invalidDate&&indicateInvalidDate}\" placeholder=\"{{showDateFormatPlaceholder?dateFormat:''}}\" [ngStyle]=\"{'height': height, 'line-height': height, 'font-size': selectionTxtFontSize, 'border': 'none', 'padding-right': selectionDayTxt.length>0 ? '60px' : '30px'}\" (keyup)=\"userDateInput($event)\" [value]=\"selectionDayTxt\"> <span class=\"selbtngroup\" [style.height]=\"height\"><button type=\"button\" class=\"btnclear\" *ngIf=\"selectionDayTxt.length>0\" (click)=\"removeBtnClicked()\"><span class=\"icon icon-cross\" [ngStyle]=\"{'line-height': height}\"></span></button> <button type=\"button\" class=\"btnpicker\" (click)=\"openBtnClicked()\"><span class=\"icon icon-calendar\" [ngStyle]=\"{'line-height': height}\"></span></button></span></div><div class=\"selector\" *ngIf=\"showSelector||inline\" [ngClass]=\"{'inlinedp': inline, 'alignselectorright': alignSelectorRight}\"><table class=\"header\"><tr><td><div style=\"float:left\"><div class=\"headerbtn\" (click)=\"prevMonth()\"><span class=\"icon icon-left\"></span></div><div class=\"headermonthtxt\"><input type=\"text\" *ngIf=\"editMonth\" class=\"monthinput\" maxlength=\"4\" [inputFocus] [value]=\"visibleMonth.monthTxt\" (keyup)=\"userMonthInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidmonth': invalidMonth}\"> <span [ngClass]=\"{'monthlabel': editableMonthAndYear}\" *ngIf=\"!editMonth\" (click)=\"editMonthClicked($event)\">{{visibleMonth.monthTxt}}</span></div><div class=\"headerbtn\" (click)=\"nextMonth()\"><span class=\"icon icon-right\"></span></div></div></td><td><button type=\"button\" class=\"headertodaybtn\" (click)=\"todayClicked()\">{{todayBtnTxt}}</button></td><td><div style=\"float:right\"><div class=\"headerbtn\" (click)=\"prevYear()\"><span class=\"icon icon-left\"></span></div><div class=\"headeryeartxt\"><input type=\"text\" *ngIf=\"editYear\" class=\"yearinput\" maxlength=\"4\" [inputFocus] [value]=\"visibleMonth.year\" (keyup)=\"userYearInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidyear': invalidYear}\"> <span [ngClass]=\"{'yearlabel': editableMonthAndYear}\" *ngIf=\"!editYear\" (click)=\"editYearClicked($event)\">{{visibleMonth.year}}</span></div><div class=\"headerbtn\" (click)=\"nextYear()\"><span class=\"icon icon-right\"></span></div></div></td></tr></table><table class=\"caltable\"><thead><tr><th *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead><tbody><tr *ngFor=\"let w of dates\"><td *ngFor=\"let d of w\" [ngClass]=\"{'currmonth':d.cmo===CURR_MONTH&&!d.disabled, 'currday':d.currDay, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===CURR_MONTH, 'disabled': d.disabled, 'tablesingleday': d.cmo===CURR_MONTH&&!d.disabled}\" (click)=\"!d.disabled && cellClicked(d);$event.stopPropagation()\"><div [ngClass]=\"{'prevmonth':d.cmo===PREV_MONTH,'currmonth':d.cmo===CURR_MONTH,'nextmonth':d.cmo===NEXT_MONTH,'sunday':d.dayNbr === 0 && sunHighlight}\"><span [ngClass]=\"{'sundayDim': sunHighlight && d.dayNbr === 0 && (d.cmo===PREV_MONTH || d.cmo===NEXT_MONTH || d.disabled)}\">{{d.dateObj.day}}</span></div></td></tr></tbody></table></div></div>",
            providers: [my_date_picker_locale_service_1.LocaleService, my_date_picker_validator_service_1.ValidatorService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, my_date_picker_locale_service_1.LocaleService, my_date_picker_validator_service_1.ValidatorService])
    ], MyDatePicker);
    return MyDatePicker;
}());
exports.MyDatePicker = MyDatePicker;
//# sourceMappingURL=my-date-picker.component.js.map