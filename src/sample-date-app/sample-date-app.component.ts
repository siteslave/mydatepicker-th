import {Component, OnInit} from '@angular/core';
import {MyDatePicker} from '../my-date-picker/index';

declare var require;
const styles: string = require('./sample-date-app.component.scss');
const template: string = require('./sample-date-app.component.html');

@Component({
    selector: 'sample-date-picker',
    directives: [MyDatePicker],
    styles: [styles],
    template
})

export class SampleDateApp implements OnInit {
    private myDatePickerOptions1 = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px'
    };
    selectedDate1: string = '20.12.2015';
    
    private myDatePickerOptions2 = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px'
    };
    selectedDate2: string = '2015-04-24';

    constructor() {}

    ngOnInit() {
        console.log('onInit(): SampleDatePicker')
    }

    onDateChanged1(event) {
        console.log('onDateChanged1(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);  
    }
    
    onDateChanged2(event) {
        console.log('onDateChanged2(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);  
    }
}
