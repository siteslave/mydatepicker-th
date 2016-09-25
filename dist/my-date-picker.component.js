System.register(['@angular/core', './services/my-date-picker.locale.service', './services/my-date-picker.date.validator.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, my_date_picker_locale_service_1, my_date_picker_date_validator_service_1;
    var MyDatePicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (my_date_picker_locale_service_1_1) {
                my_date_picker_locale_service_1 = my_date_picker_locale_service_1_1;
            },
            function (my_date_picker_date_validator_service_1_1) {
                my_date_picker_date_validator_service_1 = my_date_picker_date_validator_service_1_1;
            }],
        execute: function() {
            MyDatePicker = (function () {
                function MyDatePicker(elem, localeService, dateValidatorService) {
                    var _this = this;
                    this.elem = elem;
                    this.localeService = localeService;
                    this.dateValidatorService = dateValidatorService;
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
                    this.setLocaleOptions();
                    this.today = new Date();
                    var doc = document.getElementsByTagName('html')[0];
                    doc.addEventListener('click', function (event) {
                        if (_this.showSelector && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                            _this.showSelector = false;
                        }
                    }, false);
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
                    var options = ['dayLabels', 'monthLabels', 'dateFormat', 'todayBtnTxt', 'firstDayOfWeek', 'sunHighlight', 'disableUntil', 'disableSince', 'disableWeekends', 'height', 'width', 'selectionTxtFontSize', 'inline', 'alignSelectorRight', 'indicateInvalidDate', 'showDateFormatPlaceholder'];
                    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                        var prop = options_1[_i];
                        if (this.options && (this.options)[prop] !== undefined && (this.options)[prop] instanceof Object) {
                            (this)[prop] = JSON.parse(JSON.stringify((this.options)[prop]));
                        }
                        else if (this.options && (this.options)[prop] !== undefined) {
                            (this)[prop] = (this.options)[prop];
                        }
                    }
                };
                MyDatePicker.prototype.userDateInput = function (event) {
                    this.invalidDate = false;
                    if (event.target.value.length === 0) {
                        this.removeBtnClicked();
                    }
                    else {
                        var date = this.dateValidatorService.isDateValid(event.target.value, this.dateFormat);
                        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                            this.selectDate({ day: date.day, month: date.month, year: date.year });
                        }
                        else {
                            this.invalidDate = true;
                        }
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
                    this.visibleMonth.year--;
                    this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
                };
                MyDatePicker.prototype.nextYear = function () {
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
                };
                MyDatePicker.prototype.selectDate = function (date) {
                    this.selectedDate = { day: date.day, month: date.month, year: date.year };
                    this.selectionDayTxt = this.formatDate(this.selectedDate);
                    this.showSelector = false;
                    var epoc = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day, 0, 0, 0, 0).getTime() / 1000.0;
                    this.dateChanged.emit({ date: this.selectedDate, formatted: this.selectionDayTxt, epoc: epoc });
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
                        moduleId: __moduleName,
                        styleUrls: ['my-date-picker.component.css'],
                        templateUrl: 'my-date-picker.component.html',
                        providers: [my_date_picker_locale_service_1.LocaleService, my_date_picker_date_validator_service_1.DateValidatorService]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, my_date_picker_locale_service_1.LocaleService, my_date_picker_date_validator_service_1.DateValidatorService])
                ], MyDatePicker);
                return MyDatePicker;
            }());
            exports_1("MyDatePicker", MyDatePicker);
        }
    }
});
//# sourceMappingURL=my-date-picker.component.js.map