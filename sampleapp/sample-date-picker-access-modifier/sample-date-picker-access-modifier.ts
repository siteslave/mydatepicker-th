import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

declare var require:any;
const rfSampleTpl: string = require('./sample-date-picker-access-modifier.html');

@Component({
    selector: 'sample-date-picker-access-modifier',
    template: rfSampleTpl
})

export class SampleDatePickerAccessModifier implements OnInit {

    private myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        height: '34px',
        width: '210px',
        sunHighlight: true,
        inline: false
    };

    private myForm: FormGroup;

    private model: string = '';   // not initial date set
    //private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

    private selDateRF: string = '';

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerReactiveForms');
        this.myForm = this.formBuilder.group({
            //myDate: ['', Validators.required]   // not initial date set
            myDate: [{date: {year: 2018, month: 10, day: 9}}, Validators.required]   // this example is initialized to specific date
        });
    }

    submit() {
        console.log('Value: ', this.myForm.controls['myDate'].value);
    }

}
