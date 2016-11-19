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
var core_1 = require("@angular/core");
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.prototype.isDateValid = function (dateStr, dateFormat, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableDays, monthLabels) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var isMonthStr = dateFormat.indexOf("mmm") !== -1;
        var returnDate = { day: 0, month: 0, year: 0 };
        if (dateStr.length !== 10 && !isMonthStr || dateStr.length !== 11 && isMonthStr) {
            return returnDate;
        }
        var separator = dateFormat.replace(/[dmy]/g, "")[0];
        var parts = dateStr.split(separator);
        if (parts.length !== 3) {
            return returnDate;
        }
        var day = this.parseDatePartNumber(dateFormat, dateStr, "dd");
        var month = isMonthStr ? this.parseDatePartMonthName(dateFormat, dateStr, "mmm", monthLabels) : this.parseDatePartNumber(dateFormat, dateStr, "mm");
        var year = this.parseDatePartNumber(dateFormat, dateStr, "yyyy");
        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            var date = { year: year, month: month, day: day };
            if (this.isDisabledDay(date, disableUntil, disableSince, disableWeekends, disableDays)) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }
            return date;
        }
        return returnDate;
    };
    ValidatorService.prototype.isMonthLabelValid = function (monthLabel, monthLabels) {
        for (var key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    };
    ValidatorService.prototype.isYearLabelValid = function (yearLabel, minYear, maxYear) {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    };
    ValidatorService.prototype.parseDatePartNumber = function (dateFormat, dateString, datePart) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            var value = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value);
        }
        return -1;
    };
    ValidatorService.prototype.parseDatePartMonthName = function (dateFormat, dateString, datePart, monthLabels) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    };
    ValidatorService.prototype.parseDefaultMonth = function (monthString) {
        var month = { monthTxt: "", monthNbr: 0, year: 0 };
        if (monthString !== "") {
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    };
    ValidatorService.prototype.isDisabledDay = function (date, disableUntil, disableSince, disableWeekends, disableDays) {
        var dateMs = this.getTimeInMilliseconds(date);
        if (disableUntil.year !== 0 && disableUntil.month !== 0 && disableUntil.day !== 0 && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (disableSince.year !== 0 && disableSince.month !== 0 && disableSince.day !== 0 && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (disableWeekends) {
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        for (var _i = 0, disableDays_1 = disableDays; _i < disableDays_1.length; _i++) {
            var obj = disableDays_1[_i];
            if (obj.year === date.year && obj.month === date.month && obj.day === date.day) {
                return true;
            }
        }
        return false;
    };
    ValidatorService.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    ValidatorService.prototype.getDayNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    };
    ValidatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;

//# sourceMappingURL=my-date-picker.validator.service.js.map
