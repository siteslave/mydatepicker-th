import { ElementRef, Renderer, AfterViewInit } from "@angular/core";
export declare class InputFocusDirective implements AfterViewInit {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
}
