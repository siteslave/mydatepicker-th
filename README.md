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

    // If you are using webpack package loader import the MyDatePickerModule from here:
    import { MyDatePickerModule } from 'mydatepicker';

    // If you are using systemjs package loader import the MyDatePickerModule from here:
    import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

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
      * (inputFieldChanged)="onInputFieldChanged($event)"
      * (calendarViewChanged)="onCalendarViewChanged($event)"

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
| __dateFormat__    | yyyy-mm-dd      | Date format on the selection area and the callback. For example: dd.mm.yyyy, yyyy-mm-dd, dd mmm yyyy (mmm = Month as a text) |
| __showTodayBtn__   | true      | Show 'Today' button on calendar. |
| __todayBtnTxt__   | Today      | Today button text. Can be used if __showTodayBtn = true__. |
| __firstDayOfWeek__   | mo | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__   | true | Sunday red colored on calendar. |
| __markCurrentDay__   | true | Is current day (today) marked on calendar. |
| __editableMonthAndYear__   | true | Is month and year labels editable or not. |
| __minYear__   | 1000 | Minimum allowed year in calendar. Cannot be less than 1000. |
| __maxYear__   | 9999 | Maximum allowed year in calendar. Cannot be more than 9999. |
| __disableUntil__   | no default value | Disable dates backward starting from the given date. For example: {year: 2016, month: 6, day: 26} |
| __disableSince__   | no default value | Disable dates forward starting from the given date. For example: {year: 2016, month: 7, day: 22} |
| __disableDays__   | no default value  | Disable single days one by one. Array of disabled days. For example: [{year: 2016, month: 11, day: 14}, {year: 2016, month: 1, day: 15] |
| __disableWeekends__   | false | Disable weekends (Saturday and Sunday). |
| __inline__   | false | Show mydatepicker in inline mode. |
| __height__   | 34px | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__   | 100% | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__   | 18px | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__   | false | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDate__   | true | If user typed date is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __showDateFormatPlaceholder__   | false | Show value of __dateFormat__ as placeholder in the selection area if it is empty. Can be used if __inline = false__. |
| __componentDisabled__   | false | Is selection area and buttons disabled or not. Can be used if __inline = false__. |
| __editableDateField__   | true | Is selected date field editable or not. Can be used if __inline = false__. |

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

### locale attribute

An ISO 639-1 language code can be provided as shorthand for several of
the options listed above. Currently supported languages: __en__, __fr__, __ja__, __fi__, __es__, __hu__, __sv__, __nl__, __ru__, __no__, __tr__, __pt-br__ and __de__.
If the __locale__ attribute is used it overrides dayLabels, monthLabels, dateFormat, todayBtnTxt,
firstDayOfWeek and sunHighlight properties from the options.

* new locale data can be added to [this](https://github.com/kekeh/mydatepicker/blob/master/src/my-date-picker/services/my-date-picker.locale.service.ts)
file. If you want to add a new locale create a pull request.

### selDate attribute

Provide the initially chosen date that will display both in the text input field
and provide the default for the popped-up selector. Must be in the same format as
the __dateFormat__ option is.

### defaultMonth attribute

If __selDate__ is not specified, when the datepicker is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a __[defaultMonth]__ attribute.

Value of the __[defaultMonth]__ attribute is a string which contain year number and
month number separated by delimiter. The delimiter can be any special character.
For example the value of the __[defaultMonth]__ attribute can be: __2016.08__,
__08-2016__, __08/2016__.

### dateChanged callback:
  * called when the date is selected, removed or input field typing is valid
  * event parameter:
    * event.date: Date object in the following format: { day: 22, month: 11, year: 2016 }
    * event.formatted: Date string in the same format as dateFormat option is: '2016-11-22'
    * event.epoc: Epoc time stamp number: 1479765600

  * Example of the dateChanged callback:
  ```js
  onDateChanged(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }
  ```

### inputFieldChanged callback:
  * called when the value change in the input field
  * event parameter:
    * event.value: Value of the input field. For example: '2016-11-22'
    * event.dateFormat: Date format string in the same format as dateFormat option is. For example: 'yyyy-mm-dd'
    * event.valid: Boolean value indicating is the typed value valid. For example: true

  * Example of the input field changed callback:
  ```js
  onInputFieldChanged(event:any) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  }
  ```

### calendarViewChanged callback:
  * called when the calendar view change (year or month change)
  * event parameter:
    * event.year: Year number in calendar. For example: 2016
    * event.month: Month number in calendar. For example: 11
    * event.first: First day of selected month and year. Object which contain day number and weekday string. For example: {number: 1, weekday: "tu"}
    * event.last: Last day of selected month and year. Object which contain day number and weekday string. For example: {number: 30, weekday: "we"}
  * values of the weekday property are same as values of the __firstDayOfWeek__ option

  * Example of the calendar view changed callback:
  ```js
  onCalendarViewChanged(event:any) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }
  ```

### Change styles of the component

The styles of the component can be changed by overriding the styles.

Create a separate stylesheet file which contain the changed styles. Then import the stylesheet file in the place which
is after the place where the component is loaded.

The [sampleapp](https://github.com/kekeh/mydatepicker/tree/master/sampleapp) of the component contain an example:

* [override.css](https://github.com/kekeh/mydatepicker/blob/master/sampleapp/override.css) contain the changed styles.
* [index.html](https://github.com/kekeh/mydatepicker/blob/master/sampleapp/index.html) contain import of the override.css file.


## Development of this component

At first fork and clone this repo.

Install all dependencies:
 1. __npm install__
 2. __npm install --global gulp-cli__

Build dist and npmdist folders and execute tslint:
 1. __gulp all__

Execute unit tests and coverage (output is generated to the __test-output__ folder):
 1. __npm test__

Run sample application:
 1. Open a terminal and type __npm start__
 2. Open __http://localhost:5000__ to browser

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
