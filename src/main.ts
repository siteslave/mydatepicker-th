
import {bootstrap} from "@angular/platform-browser-dynamic";

// Sample app component
import {MyDatePickerApp} from "./sample-date-picker-app";

bootstrap(MyDatePickerApp, []).catch((error: Error) => console.error(error));