import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MyDatePickerTH } from "./my-date-picker.component";
import { FocusDirective } from "./directives/my-date-picker.focus.directive";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [MyDatePickerTH, FocusDirective],
    exports: [MyDatePickerTH, FocusDirective]
})
export class MyDatePickerTHModule {
}
