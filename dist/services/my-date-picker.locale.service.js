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
var LocaleService = (function () {
    function LocaleService() {
        this.locales = {
            'en': {
                dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
                monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
                dateFormat: 'yyyy-mm-dd',
                todayBtnTxt: 'Today',
                firstDayOfWeek: 'mo',
                sunHighlight: true,
            },
            'ja': {
                dayLabels: { su: '日', mo: '月', tu: '火', we: '水', th: '木', fr: '金', sa: '土' },
                monthLabels: { 1: '１月', 2: '２月', 3: '３月', 4: '４月', 5: '５月', 6: '６月', 7: '７月', 8: '８月', 9: '９月', 10: '１０月', 11: '１１月', 12: '１２月' },
                dateFormat: 'yyyy.mm.dd',
                todayBtnTxt: '今日',
                sunHighlight: false
            },
            'fr': {
                dayLabels: { su: 'Dim', mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam' },
                monthLabels: { 1: 'Jan', 2: 'Fév', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Juin', 7: 'Juil', 8: 'Aoû', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Déc' },
                dateFormat: 'dd/mm/yyyy',
                todayBtnTxt: 'Aujourd\'hui',
                firstDayOfWeek: 'mo',
                sunHighlight: true,
            },
            'fi': {
                dayLabels: { su: 'Su', mo: 'Ma', tu: 'Ti', we: 'Ke', th: 'To', fr: 'Pe', sa: 'La' },
                monthLabels: { 1: 'Tam', 2: 'Hel', 3: 'Maa', 4: 'Huh', 5: 'Tou', 6: 'Kes', 7: 'Hei', 8: 'Elo', 9: 'Syy', 10: 'Lok', 11: 'Mar', 12: 'Jou' },
                dateFormat: 'dd.mm.yyyy',
                todayBtnTxt: 'Tämä päivä',
                firstDayOfWeek: 'mo',
                sunHighlight: true,
            },
            'es': {
                dayLabels: { su: 'Do', mo: 'Lu', tu: 'Ma', we: 'Mi', th: 'Ju', fr: 'Vi', sa: 'Sa' },
                monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
                dateFormat: 'dd.mm.yyyy',
                todayBtnTxt: 'Hoy',
                firstDayOfWeek: 'mo',
                sunHighlight: true,
            }
        };
    }
    LocaleService.prototype.getLocaleOptions = function (locale) {
        if (locale && this.locales.hasOwnProperty(locale)) {
            return this.locales[locale];
        }
        return this.locales['en'];
    };
    LocaleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocaleService);
    return LocaleService;
}());
exports.LocaleService = LocaleService;
//# sourceMappingURL=my-date-picker.locale.service.js.map