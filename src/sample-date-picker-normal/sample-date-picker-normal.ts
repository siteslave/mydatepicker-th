import {Component, OnInit} from '@angular/core';
import {MyDatePicker} from '../my-date-picker/index';

declare var require:any;
const template: string = require('./sample-date-picker-normal.html');

@Component({
    selector: 'sample-date-picker-normal',
    directives: [MyDatePicker],
    template
})

export class SampleDatePickerNormal implements OnInit {
    selectedDate:string = '';
    private myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px'
    };
    
    selectedText: string = '';
    border: string = 'none';

    constructor() {
        let date = new Date();
    }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerNormal');
    }

    onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.formatted !== '') {
            this.selectedText = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedText = '';
            this.border = 'none';
        }
    }
}