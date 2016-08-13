import {Component, OnInit} from '@angular/core';
import {NgStyle} from '@angular/common';
import {MyDatePicker} from '../my-date-picker/index';


@Component({
    selector: 'sample-date-picker-inline',
    directives: [MyDatePicker],
    template: '<div style="padding:4px;border-radius:4px;margin-bottom:8px;float:right" [ngStyle]="{border: border}">{{selectedText}}</div><my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event)" [selDate]="selectedDate"></my-date-picker>'
})

export class SampleDatePickerInline implements OnInit {

    private myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: true,
        disableUntil: {year: 0, month: 0, day: 0}
    };
    selectedDate: string = '';

    selectedText: string = '';
    border: string = 'none';
    
    constructor() {
        let date = new Date();
        this.selectedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        // Disable dates from 5th backward
        date.setDate(date.getDate() - 5);
        this.myDatePickerOptions.disableUntil = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
    }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerInline');
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