import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerApp }  from './sample-date-picker-app';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ MyDatePickerApp ],
    bootstrap:    [ MyDatePickerApp ]
})
export class SampleDatePickerModule { }