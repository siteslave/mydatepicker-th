import {bootstrap, Component} from 'angular2/angular2';
import {MyDatePicker} from './mydatepicker';

@Component({
    selector: 'sample-date-picker',
    template: `<my-date-picker [(options)]="myDatePickerOptions" (date-changed)="onDateChanged($event)"></my-date-picker>`,
    directives: [MyDatePicker]
})

class SampleDatePicker {
    private myDatePickerOptions = {
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px'
    };
    constructor() {}

    onInit() {
        console.log('onInit(): SampleDatePicker')
    }

    onDateChanged(event) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted);
    }
}
bootstrap(SampleDatePicker);