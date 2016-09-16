import {Directive, ElementRef, HostListener, Renderer} from '@angular/core';

@Directive({
    selector: '[hoverItem]',
    inputs: ['hoverItem']
})

export class HoverItemDirective {

    hoverColor: string = '#8BDAF4';
    hoverItem: any = {prop: '', value: false};

    constructor(private el: ElementRef, private renderer: Renderer) {}

    @HostListener('mouseenter') onMouseEnter() {
        if (this.hoverItem.value) {
            this.hover(this.hoverColor);
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.hover(null);
    }

    private hover(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, this.hoverItem.prop, color);
    }
}