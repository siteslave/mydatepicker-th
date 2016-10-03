"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var my_date_picker_component_1 = require('./my-date-picker.component');
var my_date_picker_input_directive_1 = require('./directives/my-date-picker.input.directive');
var MyDatePickerModule = (function () {
    function MyDatePickerModule() {
    }
    MyDatePickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [my_date_picker_component_1.MyDatePicker, my_date_picker_input_directive_1.InputFocusDirective],
            exports: [my_date_picker_component_1.MyDatePicker, my_date_picker_input_directive_1.InputFocusDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], MyDatePickerModule);
    return MyDatePickerModule;
}());
exports.MyDatePickerModule = MyDatePickerModule;
//# sourceMappingURL=my-date-picker.module.js.map