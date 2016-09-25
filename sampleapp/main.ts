///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
///<reference path="../node_modules/@types/node/index.d.ts"/>

import 'rxjs';
import 'core-js/es6';
import 'core-js/es7/reflect';

declare var require:any;
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SampleDatePickerModule } from './sample-date-picker-module';

platformBrowserDynamic().bootstrapModule(SampleDatePickerModule);