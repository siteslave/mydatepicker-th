import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDatePicker} from './my-date-picker.component';
import {HoverItemDirective} from './my-date-picker.hover.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDatePicker, HoverItemDirective ],
    exports: [ MyDatePicker, HoverItemDirective ]
})
export class MyDatePickerModule { }
