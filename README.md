# mydatepicker v. 0.0.2

**Angular2 date picker - Angular2 reusable UI component**

## Description
Simple Angular2 date picker. Uses version "2.0.0-beta.13" of Angular2.

##Getting Started
1. Fork and clone this repo
2. npm install
3. Run the TypeScript compiler and watch for changes "npm run tsc"
4. Open second terminal and launch the app in the browser "npm start"

## Installation

To install this component to an external project, follow the procedure:

1. Make sure you're using Webpack and have installed `raw-loader`.
2. `npm install ForNeVeR/mydatepicker`.
3. `import {MyDatePicker} from 'MyDatePicker/src/app/mydatepicker';`
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
  
#### height
  `'34px'`
  
#### width
  `'100%'`

### selDate
Provide the initially chosen date that will display both in the text input field
and provide the default for the popped-up datepicker.

## Demo
Online demo is [here](http://kekeh.github.io/mydatepicker)

## Compatibility (tested with)
* Firefox (latest)
* Chromium (latest)

## License
* License: MIT

## Author
* Author: kekeh
