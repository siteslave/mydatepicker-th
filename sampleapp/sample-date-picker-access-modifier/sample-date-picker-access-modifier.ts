import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

declare var require:any;
const amSampleTpl: string = require('./sample-date-picker-access-modifier.html');

@Component({
    selector: 'sample-date-picker-access-modifier',
    template: amSampleTpl
})

export class SampleDatePickerAccessModifier implements OnInit {

    private myDatePickerOptions = {
        dateFormat: 'dd.mm.yyyy',
        height: '34px',
        width: '210px',
        inline: false
    };

    private myForm: FormGroup;

    private model: string = '';   // not initial date set
    //private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerReactiveForms');
        this.myForm = this.formBuilder.group({
            //myDate: ['', Validators.required]   // not initial date set
            myDate: [{date: {year: 2018, month: 10, day: 9}}, Validators.required]   // this example is initialized to specific date
        });
    }

    onSubmitNgModel() {
        console.log('Value: ', this.model);
    }

    onSubmitReactiveForms() {
        console.log('Value: ', this.myForm.controls['myDate'].value);
    }
}
