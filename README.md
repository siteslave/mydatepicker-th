# mydatepicker

**Angular 2 date picker - Angular2 reusable UI component**

[![Build Status](https://travis-ci.org/kekeh/mydatepicker.svg?branch=master)](https://travis-ci.org/kekeh/mydatepicker)
[![codecov](https://codecov.io/gh/kekeh/mydatepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/kekeh/mydatepicker)
[![npm](https://img.shields.io/npm/v/mydatepicker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/mydatepicker)

## Description
Simple Angular2 date picker. Online demo is [here](http://kekeh.github.io/mydatepicker)

## Installation

To install this component to an external project, follow the procedure:

1. __npm install mydatepicker --save__
2. Add __MyDatePickerModule__ import to your __@NgModule__ like example below
    ```js
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';
    import { MyDatePickerModule } from 'mydatepicker';

    @NgModule({
        imports:      [ BrowserModule, MyDatePickerModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```

3. Use the following snippet inside your template:

   ```html
   <my-date-picker [options]="myDatePickerOptions"
                   (dateChanged)="onDateChanged($event)"></my-date-picker>
   ```

    * Mandatory attributes:
      * [options]="myDatePickerOptions"
      * (dateChanged)="onDateChanged($event)"

    * Optional attributes:
      * [selDate]="selectedDate" || [defaultMonth]="defaultMonth"
      * [locale]="locale"

    * Example of the options data (not all properties listed):
    ```js
        myDatePickerOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };
    ```

    * Example of the date changed callback:
    ```js
        onDateChanged(event:any) {
            console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        }
    ```

4. If you are using __systemjs__ package loader add the following mydatepicker properties to the __System.config__:
    ```js
    (function (global) {
        System.config({
            paths: {
                'npm:': 'node_modules/'
            },
            map: {
                // Other components are here...

                'mydatepicker': 'npm:mydatepicker',
            },
            packages: {
                // Other components are here...

                mydatepicker: {
                    main: './index.js',
                    defaultExtension: 'js'
                }
            }
        });
    })(this);
    ```

## Usage

### options attribute

Value of the __options__ attribute is a javascript object. It can contain the following properties.


| Option        | Default       | Description  |
| :------------- | :------------- | :----- |
| __dayLabels__     | {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'} | Day labels visible on the selector. |
| __monthLabels__   | { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' } | Month labels visible on the selector. |
| __dateFormat__    | yyyy-mm-dd      | Date format on selection area and callback. |
| __todayBtnTxt__   | Today      | Today button text. |
| __firstDayOfWeek__   | mo | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__   | true | Sunday red colored on calendar. |
| __editableMonthAndYear__   | true | Is month and year labels editable or not. |
| __minYear__   | 1000 | Minimum allowed year in calendar. Cannot be less than 1000. |
| __maxYear__   | 9999 | Maximum allowed year in calendar. Cannot be more than 9999. |
| __disableUntil__   | no default value | Disable dates backward starting from the given date. For example: {year: 2016, month: 6, day: 26} |
| __disableSince__   | no default value | Disable dates forward starting from the given date. For example: {year: 2016, month: 7, day: 22} |
| __disableWeekends__   | false | Disable weekends (Saturday and Sunday). |
| __inline__   | false | Show mydatepicker in inline mode. |
| __height__   | 34px | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__   | 100% | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__   | 18px | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__   | false | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDate__   | true | If user typed date is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __showDateFormatPlaceholder__   | false | Show value of __dateFormat__ as placeholder in the selection area if it is empty. Can be used if __inline = false__. |
  
### locale attribute

A two-letter ISO 639-1 language code can be provided as shorthand for several of
the options listed above. Currently supported languages: __en__, __fr__, __ja__, __fi__ and __es__.
If the __locale__ attribute is used it overrides dayLabels, monthLabels, dateFormat, todayBtnTxt,
firstDayOfWeek and sunHighlight properties from the options.

* new locale data can be added to [this](https://github.com/kekeh/mydatepicker/blob/master/src/my-date-picker/services/my-date-picker.locale.service.ts) file.

### selDate attribute

Provide the initially chosen date that will display both in the text input field
and provide the default for the popped-up selector.

### defaultMonth attribute

If __selDate__ is not specified, when the datepicker is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a __[defaultMonth]__ in the same format as
that for the datepicker options (__yyyy.mm__ if not otherwise specified).

## Development of this component

At first fork and clone this repo.

Install all dependencies:

1. __npm install__
2. __npm install --global gulp-cli__

Run sample application:

1. Open a terminal and type __npm start__
2. Open __http://localhost:5000__ to browser

Build dist folder (javascript version of the component):
* __gulp all__

Execute unit tests and coverage (output is generated to the __test-output__ folder):
* __npm test__

## Demo
Online demo is [here](http://kekeh.github.io/mydatepicker)

## Compatibility (tested with)
* Firefox (latest)
* Chromium (latest)
* Edge
* IE11

## License
* License: MIT

## Author
* Author: kekeh
