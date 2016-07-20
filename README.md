# mydatepicker v. 0.0.15

**Angular 2 date picker - Angular2 reusable UI component**

## Description
Simple Angular2 date picker. Online demo is [here](http://kekeh.github.io/mydatepicker)

## Getting Started
1. Fork and clone this repo
2. npm install
3. Open a terminal and type "npm start"
4. Open "http://localhost:5000" to browser

## Installation

To install this component to an external project, follow the procedure:

1. Make sure you're using Webpack and have installed `raw-loader`, `postcss-loader`.
2. `npm install mydatepicker`.
3. `import {MyDatePicker} from 'MyDatePicker/src/index';`
4. Use the following snippet inside your template:

   ```html
   <my-date-picker [options]="myDatePickerOptions"
                   (dateChanged)="onDateChanged($event)"
                   [selDate]="selectedDate"></my-date-picker>
   ```

## Usage

All input properties are optional.

### options
Bind to an object containing replacements for any of the following defaults:

#### dayLabels
  `{su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'}`
  
#### monthLabels
  `{ 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }`
    
#### dateFormat
  `'yyyy-mm-dd'`
  
#### todayBtnTxt
  `'Today'`
  
#### firstDayOfWeek
  `'mo'`
  
#### sunHighlight
  `true`
  
#### disableUntil
  `{year: 2016, month: 6, day: 26}`
  
#### disableSince
  `{year: 2016, month: 7, day: 22}`
  
#### disableWeekends
  `false`

#### inline
  `false`
  
#### height
  `'34px'`
  
#### width
  `'100%'`

### locale
A two-letter ISO 639-1 language code can be provided as shorthand for several of
the options listed above. Currently supported languages: ja.

### selDate
Provide the initially chosen date that will display both in the text input field
and provide the default for the popped-up datepicker.

### defaultMonth
If `selDate` is not specified, when the datepicker is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a `[defaultMonth]` in the same format as
that for the datepicker options (`yyyy.mm` if not otherwise specified).

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
