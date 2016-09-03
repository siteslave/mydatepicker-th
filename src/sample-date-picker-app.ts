import {Component} from '@angular/core';
import {SampleDatePickerNormal} from './sample-date-picker-normal/index';
import {SampleDatePickerInline} from './sample-date-picker-inline/index';

declare var require:any;
const styles: string = require('./sample-date-picker-app.css');
const template: string = require('./sample-date-picker-app.html');

@Component({
  selector: 'mydatepicker-app',
  styles: [styles],
  template
})

export class MyDatePickerApp {

  constructor() {
    console.log('constructor: MyDatePickerApp');
  }

}
