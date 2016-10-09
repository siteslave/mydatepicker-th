///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MyDatePicker} from './my-date-picker.component';
import {InputFocusDirective} from './directives/my-date-picker.input.directive';

let comp: MyDatePicker;
let fixture: ComponentFixture<MyDatePicker>;
let de: DebugElement;
let el: HTMLElement;

function getDateString(date:any):string {
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id:string):DebugElement {
    return de.query(By.css(id));
}

function getElements(id:string):Array<DebugElement> {
    return de.queryAll(By.css(id));
}

describe('MyDatePicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyDatePicker, InputFocusDirective],
        });

        fixture = TestBed.createComponent(MyDatePicker);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.mydp'));
        el = de.nativeElement;
    });

    it('set valid date', () => {
        comp.selectionDayTxt = '2016-08-22';
        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-08-22');
    });

    it('open/close selector', () => {
        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        let selector = getElement('.selector');
        expect(selector).toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);
    });

    it('select current day from the selector and clear', () => {
        let date = new Date();
        comp.selectedMonth = {monthTxt: '', monthNbr: date.getMonth() + 1, year: date.getFullYear()};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let currday = getElement('.currday');
        expect(currday).not.toBe(null);

        currday.nativeElement.click();

        let dateStr = getDateString(date);
        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain(dateStr);

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();
        expect(selection.nativeElement.value).toContain('');
    });

    it('select today button', () => {
        let date = new Date();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let today = getElement('.headertodaybtn');
        expect(today).not.toBe(null);

        today.nativeElement.click();

        let dateStr = getDateString(date);
        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain(dateStr);

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();
        expect(selection.nativeElement.value).toContain('');
    });

    it('select previous month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:first-child');
        expect(prevmonth).not.toBe(null);

        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Apr');
        expect(comp.visibleMonth.monthNbr).toBe(4);
        expect(comp.visibleMonth.year).toBe(2016);
    });

    it('select next month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(nextmonth).not.toBe(null);

        nextmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Jun');
        expect(comp.visibleMonth.monthNbr).toBe(6);
        expect(comp.visibleMonth.year).toBe(2016);
    });

    it('select previous month january change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:first-child');
        expect(prevmonth).not.toBe(null);

        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Dec');
        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2015);
    });

    it('select next month december change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 12, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(nextmonth).not.toBe(null);

        nextmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Jan');
        expect(comp.visibleMonth.monthNbr).toBe(1);
        expect(comp.visibleMonth.year).toBe(2017);
    });

    it('select previous month from selector', () => {
        comp.selectedMonth = {monthTxt: 'May', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevmonth = getElement('.caltable tbody tr td:first-child');
        expect(prevmonth).not.toBe(null);

        prevmonth.nativeElement.click();
        setTimeout(function() {
            expect(comp.visibleMonth.monthTxt).toBe('Apr');
            expect(comp.visibleMonth.monthNbr).toBe(4);
            expect(comp.visibleMonth.year).toBe(2016);
        });

        prevmonth.nativeElement.click();
        setTimeout(function() {
            expect(comp.visibleMonth.monthTxt).toBe('Mar');
            expect(comp.visibleMonth.monthNbr).toBe(3);
            expect(comp.visibleMonth.year).toBe(2016);
        });
    });

    it('select next month from selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextmonth = getElement('.nextmonth');
        expect(nextmonth).not.toBe(null);

        nextmonth.nativeElement.click();
        setTimeout(function() {
            expect(comp.visibleMonth.monthTxt).toBe('Jun');
            expect(comp.visibleMonth.monthNbr).toBe(6);
            expect(comp.visibleMonth.year).toBe(2016);
        });

        nextmonth.nativeElement.click();
        setTimeout(function() {
            expect(comp.visibleMonth.monthTxt).toBe('Jul');
            expect(comp.visibleMonth.monthNbr).toBe(7);
            expect(comp.visibleMonth.year).toBe(2016);
        });
    });

    it('select previous year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevyear = getElement('.header tr td:last-child .headerbtn:first-child');
        expect(prevyear).not.toBe(null);

        prevyear.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.year).toBe(2015);
    });

    it('select next year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextyear = getElement('.header tr td:last-child .headerbtn:last-child');
        expect(nextyear).not.toBe(null);

        nextyear.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.year).toBe(2017);
    });

    // options
    it('options dayLabels', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.dayLabels = {su: '1', mo: '2', tu: '3', we: '4', th: '5', fr: '6', sa: '7'};
        comp.firstDayOfWeek = 'su';

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let ths = getElements('.caltable thead tr th');
        expect(ths.length).toBe(7);
        for(let i in ths) {
            let el = ths[i];
            expect(parseInt(el.nativeElement.textContent)).toBe(parseInt(i) + 1);
        }
    });

    it('options monthLabels', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.monthLabels = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12' };

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let nextmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(nextmonth).not.toBe(null);

        for(let i = 1; i <= 12; i++) {
            fixture.detectChanges();
            let monthLabel = getElement('.headermonthtxt span');
            expect(parseInt(monthLabel.nativeElement.textContent)).toBe(i);
            nextmonth.nativeElement.click();
        }
    });


});





