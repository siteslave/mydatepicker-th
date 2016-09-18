import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDatePicker} from './my-date-picker.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDatePicker ],
    exports: [ MyDatePicker ]
})
export class MyDatePickerModule { }
