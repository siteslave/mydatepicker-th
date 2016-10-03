import { ElementRef, Renderer, OnInit } from '@angular/core';
export declare class InputFocusDirective implements OnInit {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
}
