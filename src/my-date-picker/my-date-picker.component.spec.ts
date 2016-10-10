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

        expect(comp.visibleMonth.year).toBe(2017);
    });

    it('select previous month from selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:first-child');
        expect(prevmonth).not.toBe(null);

        prevmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(4);
        expect(comp.visibleMonth.monthTxt).toBe('Apr');

        prevmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(3);
        expect(comp.visibleMonth.monthTxt).toBe('Mar');
    });

    it('select next month from selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let nextmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(nextmonth).not.toBe(null);

        nextmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(6);
        expect(comp.visibleMonth.monthTxt).toBe('Jun');

        nextmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(7);
        expect(comp.visibleMonth.monthTxt).toBe('Jul');
    });

    it('select previous year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let prevyear = getElement('.header tr td:last-child .headerbtn:first-child');
        expect(prevyear).not.toBe(null);

        prevyear.nativeElement.click();
        fixture.detectChanges();
        let yearLabel = getElement('.headeryeartxt span');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2015');
    });

    it('select next year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let nextyear = getElement('.header tr td:last-child .headerbtn:last-child');
        expect(nextyear).not.toBe(null);

        nextyear.nativeElement.click();

        fixture.detectChanges();
        let yearLabel = getElement('.headeryeartxt span');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2017');
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

    it('options date format', () => {
        comp.dateFormat = 'dd.mm.yyyy';
        comp.indicateInvalidDate = true;

        comp.parseOptions();

        let value = {target:{value:'2016-08-22'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        fixture.detectChanges();
        let invaliddate = getElement('.invaliddate');
        expect(invaliddate).not.toBe(null);

        value = {target:{value:'2016-08-2'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        value = {target:{value:'16.09/2016'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        value = {target:{value:'2016-08-xx'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        value = {target:{value:'16.09.999'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        value = {target:{value:'16.09.19999'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(true);

        value = {target:{value:'16.09.2016'}};
        comp.userDateInput(value);
        expect(comp.invalidDate).toBe(false);
    });

    it('options today button text', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.todayBtnTxt = 'test text';

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).not.toBe(null);
        expect(headertodaybtn.nativeElement.textContent).toBe('test text');
    });

    it('options first day of week', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.firstDayOfWeek = 'tu';

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let first = getElement('.caltable thead tr th:first-child');
        expect(first).not.toBe(null);
        expect(first.nativeElement.textContent).toBe('Tue');

        let last = getElement('.caltable thead tr th:last-child');
        expect(last).not.toBe(null);
        expect(last.nativeElement.textContent).toBe('Mon');
    });

    it('options sunday highlight', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.sunHighlight = true;

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let sunday = getElement('.sunday');
        expect(sunday).not.toBe(null);

        btnpicker.nativeElement.click();

        comp.sunHighlight = false;

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        sunday = getElement('.sunday');
        expect(sunday).toBe(null);
    });

    it('options editable month and year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.editableMonthAndYear = true;

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let montlabel = getElement('.headermonthtxt span');
        expect(montlabel).not.toBe(null);
        montlabel.nativeElement.click();

        fixture.detectChanges();
        let monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);

        monthinput.nativeElement.value = 'jan';

        comp.userMonthInput({target:{value:'jan'}});

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt span');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jan');


        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        yearinput.nativeElement.value = '2019';

        comp.userYearInput({target:{value:'2019'}});

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2019');
    });

    it('options min year', () => {
        comp.visibleMonth = {monthTxt: 'May', monthNbr: 5, year: 2016};
        comp.minYear = 2000;

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.userYearInput({target:{value:1999}});

        fixture.detectChanges();
        let invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);

        comp.userYearInput({target:{value:2000}});

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2000');
    });

    it('options max year', () => {
        comp.visibleMonth = {monthTxt: 'May', monthNbr: 5, year: 2016};
        comp.maxYear = 2020;

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.userYearInput({target:{value:2021}});

        fixture.detectChanges();
        let invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);

        comp.userYearInput({target:{value:2020}});

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt span');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2020');
    });

    it('options disable until', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.disableUntil = {year: 2016, month: 10, day: 5};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();
        comp.generateCalendar(10, 2016);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(10);

        let firstDisabled = disabled[0];
        expect(firstDisabled.nativeElement.textContent.trim()).toBe('26');

        let lastDisabled = disabled[disabled.length - 1];
        expect(lastDisabled.nativeElement.textContent.trim()).toBe('5');

        fixture.detectChanges();
        lastDisabled.nativeElement.click();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toBe('');

        fixture.detectChanges();
        let selectableDays = getElements('.tablesingleday');
        expect(selectableDays).not.toBe(null);
        expect(selectableDays.length).toBe(26);

        selectableDays[0].nativeElement.click();
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-10-06');
    });

    it('options disable since', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.disableSince = {year: 2016, month: 10, day: 30};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();
        comp.generateCalendar(10, 2016);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(8);

        let firstDisabled = disabled[0];
        expect(firstDisabled.nativeElement.textContent.trim()).toBe('30');

        let lastDisabled = disabled[disabled.length - 1];
        expect(lastDisabled.nativeElement.textContent.trim()).toBe('6');

        fixture.detectChanges();
        lastDisabled.nativeElement.click();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toBe('');

        fixture.detectChanges();
        let selectableDays = getElements('.tablesingleday');
        expect(selectableDays).not.toBe(null);
        expect(selectableDays.length).toBe(29);

        selectableDays[5].nativeElement.click();

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-10-06');
    });

    it('options disable weekends', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.firstDayOfWeek = 'mo';
        comp.disableWeekends = true;

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();
        comp.generateCalendar(10, 2016);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(12);

        let firstDisabled = disabled[0];
        expect(firstDisabled.nativeElement.textContent.trim()).toBe('1');

        let lastDisabled = disabled[disabled.length - 1];
        expect(lastDisabled.nativeElement.textContent.trim()).toBe('6');

        fixture.detectChanges();
        firstDisabled.nativeElement.click();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toBe('');

        fixture.detectChanges();
        let selectableDays = getElements('.tablesingleday');
        expect(selectableDays).not.toBe(null);
        expect(selectableDays.length).toBe(21);

        selectableDays[0].nativeElement.click();

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-10-03');
    });

});





