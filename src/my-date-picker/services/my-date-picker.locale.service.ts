import { Injectable } from "@angular/core";
import { IMyLocales, IMyOptions } from "../interfaces/index";

@Injectable()
export class LocaleService {
    private locales: IMyLocales = {
        "en": {
            dayLabels: {su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "Today",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "ja": {
            dayLabels: {su: "日", mo: "月", tu: "火", we: "水", th: "木", fr: "金", sa: "土"},
            monthLabels: {1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月"},
            dateFormat: "yyyy.mm.dd",
            todayBtnTxt: "今日",
            sunHighlight: false
        },
        "fr": {
            dayLabels: {su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam"},
            monthLabels: {1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc"},
            dateFormat: "dd/mm/yyyy",
            todayBtnTxt: "Aujourd'hui",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "fi": {
            dayLabels: {su: "Su", mo: "Ma", tu: "Ti", we: "Ke", th: "To", fr: "Pe", sa: "La"},
            monthLabels: {1: "Tam", 2: "Hel", 3: "Maa", 4: "Huh", 5: "Tou", 6: "Kes", 7: "Hei", 8: "Elo", 9: "Syy", 10: "Lok", 11: "Mar", 12: "Jou"},
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Tänään",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "es": {
            dayLabels: {su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa"},
            monthLabels: {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"},
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Hoy",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "hu": {
            dayLabels: {su: "Vas", mo: "Hét", tu: "Kedd", we: "Sze", th: "Csü", fr: "Pén", sa: "Szo"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Már", 4: "Ápr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Szep", 10: "Okt", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "Ma",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "sv": {
            dayLabels: {su: "Sön", mo: "Mån", tu: "Tis", we: "Ons", th: "Tor", fr: "Fre", sa: "Lör"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "Idag",
            firstDayOfWeek: "mo",
            sunHighlight: false
        },
        "nl": {
            dayLabels: {su: "Zon", mo: "Maa", tu: "Din", we: "Woe", th: "Don", fr: "Vri", sa: "Zat"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
            dateFormat: "dd-mm-yyyy",
            todayBtnTxt: "Vandaag",
            firstDayOfWeek: "mo",
            sunHighlight: false
        },
        "ru": {
            dayLabels: {su: "Вс", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб"},
            monthLabels: { 1: "Янв", 2: "Фев", 3: "Март", 4: "Апр", 5: "Май", 6: "Июнь", 7: "Июль", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Ноя", 12: "Дек" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Сегодня",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "uk": {
            dayLabels: {su: "Нд", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб"},
            monthLabels: { 1: "Січ", 2: "Лют", 3: "Бер", 4: "Кві", 5: "Тра", 6: "Чер", 7: "Лип", 8: "Сер", 9: "Вер", 10: "Жов", 11: "Лис", 12: "Гру" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Сьогодні",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "no": {
            dayLabels: {su: "Søn", mo: "Man", tu: "Tir", we: "Ons", th: "Tor", fr: "Fre", sa: "Lør"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Des" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "I dag",
            firstDayOfWeek: "mo",
            sunHighlight: false
        },
        "tr": {
            dayLabels: {su: "Paz", mo: "Pzt", tu: "Sal", we: "Çar", th: "Per", fr: "Cum", sa: "Cmt"},
            monthLabels: { 1: "Oca", 2: "Şub", 3: "Mar", 4: "Nis", 5: "May", 6: "Haz", 7: "Tem", 8: "Ağu", 9: "Eyl", 10: "Eki", 11: "Kas", 12: "Ara" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Bugün",
            firstDayOfWeek: "mo",
            sunHighlight: false
        },
        "pt-br": {
            dayLabels: {su: "Dom", mo: "Seg", tu: "Ter", we: "Qua", th: "Qui", fr: "Sex", sa: "Sab"},
            monthLabels: { 1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez" },
            dateFormat: "dd/mm/yyyy",
            todayBtnTxt: "Hoje",
            firstDayOfWeek: "su",
            sunHighlight: true
        },
        "de": {
            dayLabels: {su: "So", mo: "Mo", tu: "Di", we: "Mi", th: "Do", fr: "Fr", sa: "Sa"},
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mär", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dez" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Heute",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "it": {
            dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
            monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
            dateFormat: "dd/mm/yyyy",
            todayBtnTxt: "Oggi",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "it-ch": {
            dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
            monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Oggi",
            firstDayOfWeek: "mo",
            sunHighlight: true
        },
        "pl": {
            dayLabels: { su: "Nie", mo: "Pon", tu: "Wto", we: "Śro", th: "Czw", fr: "Pią", sa: "Sob" },
            monthLabels: { 1: "Sty", 2: "Lut", 3: "Mar", 4: "Kwi", 5: "Maj", 6: "Cze", 7: "Lip", 8: "Sie", 9: "Wrz", 10: "Paź", 11: "Lis", 12: "Gru" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "Dzisiaj",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "my": {
            dayLabels: {su: "တနင်္ဂနွေ", mo: "တနင်္လာ", tu: "အင်္ဂါ", we: "ဗုဒ္ဓဟူး", th: "ကြသပတေး", fr: "သောကြာ", sa: "စနေ"},
            monthLabels: { 1: "ဇန်နဝါရီ", 2: "ဖေဖော်ဝါရီ", 3: "မတ်", 4: "ဧပြီ", 5: "မေ", 6: "ဇွန်", 7: "ဇူလိုင်", 8: "ဩဂုတ်", 9: "စက်တင်ဘာ", 10: "အောက်တိုဘာ", 11: "နိုဝင်ဘာ", 12: "ဒီဇင်ဘာ" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "ယနေ့",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "sk": {
            dayLabels: { su: "Ne", mo: "Po", tu: "Ut", we: "St", th: "Št", fr: "Pi", sa: "So" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Dnes",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        },
        "sl": {
            dayLabels: { su: "Ned", mo: "Pon", tu: "Tor", we: "Sre", th: "Čet", fr: "Pet", sa: "Sob" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Avg", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
            dateFormat: "dd. mm. yyyy",
            todayBtnTxt: "Danes",
            firstDayOfWeek: "mo",
            sunHighlight: true,
        }
    };

    getLocaleOptions(locale: string): IMyOptions {
        if (locale && this.locales.hasOwnProperty(locale)) {
            // User given locale
            return this.locales[locale];
        }
        // Default: en
        return this.locales["en"];
    }
}
