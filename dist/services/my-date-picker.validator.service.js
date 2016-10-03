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
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.prototype.isDateValid = function (date, dateFormat, minYear, maxYear) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var returnDate = { day: 0, month: 0, year: 0 };
        if (date.length !== 10) {
            return returnDate;
        }
        var separator = dateFormat.replace(/[dmy]/g, '')[0];
        var parts = date.split(separator);
        if (parts.length !== 3) {
            return returnDate;
        }
        var dpos = dateFormat.indexOf('dd');
        var mpos = dateFormat.indexOf('mm');
        var ypos = dateFormat.indexOf('yyyy');
        if (dpos !== -1 && mpos !== -1 && ypos !== -1) {
            var day = parseInt(date.substring(dpos, dpos + 2)) || 0;
            var month = parseInt(date.substring(mpos, mpos + 2)) || 0;
            var year = parseInt(date.substring(ypos, ypos + 4)) || 0;
            if (day === 0 || month === 0 || year === 0) {
                return returnDate;
            }
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }
            return { day: day, month: month, year: year };
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
    ValidatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=my-date-picker.validator.service.js.map