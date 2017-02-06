import { Directive, ElementRef, Renderer, AfterViewInit, Input } from "@angular/core";

@Directive({
    selector: "[focus]"
})

export class FocusDirective implements AfterViewInit {
    @Input() inputElem: boolean;

    constructor(private el: ElementRef, private renderer: Renderer) {}

    ngAfterViewInit() {
        // Sets focus to rendered input element (month or year value)
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);

        // Set cursor position at the end of text if input element
        if (this.inputElem) {
            let len = this.el.nativeElement.value.length;
            this.el.nativeElement.setSelectionRange(len, len);
        }
    }
}