///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { MyDatePicker } from '../dist/my-date-picker.component';

let comp:    MyDatePicker;
let fixture: ComponentFixture<MyDatePicker>;
let de:      DebugElement;
let el:      HTMLElement;

describe('MyDatePicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MyDatePicker ],
        });

        fixture = TestBed.createComponent(MyDatePicker);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.mydp'));
        el = de.nativeElement;

    });
});

// TODO: add test cases