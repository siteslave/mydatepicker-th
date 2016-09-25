import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MyDatePickerApp} from './sample-date-picker-app';
import {SampleDatePickerNormal} from './sample-date-picker-normal';
import {SampleDatePickerInline} from './sample-date-picker-inline';
import {MyDatePickerModule} from '../src/my-date-picker/my-date-picker.module';

@NgModule({
    imports: [BrowserModule, MyDatePickerModule],
    declarations: [MyDatePickerApp, SampleDatePickerNormal, SampleDatePickerInline],
    bootstrap: [MyDatePickerApp]
})
export class SampleDatePickerModule { }