import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDatePicker} from './my-date-picker.component';
import {InputFocusDirective} from './directives/my-date-picker.input.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDatePicker, InputFocusDirective ],
    exports: [ MyDatePicker, InputFocusDirective ]
})
export class MyDatePickerModule { }
