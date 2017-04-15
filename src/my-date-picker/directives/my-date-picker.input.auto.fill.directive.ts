import { Directive, ElementRef, Renderer, Input, HostListener } from "@angular/core";
import { IMyInputAutoFill } from "../interfaces/my-input-auto-fill.interface";

enum KeyCode {backspace = 8, delete = 46}

@Directive({
    selector: "[myinputautofill]"
})

export class InputAutoFillDirective {
    @Input("myinputautofill") opts: IMyInputAutoFill;

    constructor(private el: ElementRef, private rndr: Renderer) {}

    @HostListener("keyup", ["$event"]) onKeyUp(evt: KeyboardEvent) {
        if (!this.opts.enabled || evt.keyCode === KeyCode.backspace || evt.keyCode === KeyCode.delete) {
            return;
        }

        let val: string = this.getInputValue();
        let ews: boolean = this.endsWith(val, this.opts.separator);
        let parts: Array<string> = val.split(this.opts.separator);
        let idx: number = parts.length - 1;

        if (val.indexOf(this.opts.separator + this.opts.separator) !== -1 || idx > 2) {
            return;
        }

        if (!ews && (val.length === this.getPartLength(0) || val.length === this.getPartLength(0) + this.getPartLength(1) + this.opts.separator.length)) {
            this.setInputValue(val + this.opts.separator);
        }
        else if (ews && parts[idx - 1].length < this.getPartLength(idx - 1) && this.isNumber(parts[idx - 1]) && (this.isDay(idx - 1) || this.isMonth(idx - 1))) {
            this.setInputValue(this.insertPos(val, val.length - 2, "0"));
        }
        else if (parts[idx].length < this.getPartLength(idx) && this.isNumber(parts[idx]) && (Number(parts[idx]) > 3 && this.isDay(idx) || Number(parts[idx]) > 1 && this.isMonth(idx))) {
            this.setInputValue(this.insertPos(val, val.length - 1, "0") + (idx < 2 ? this.opts.separator : ""));
        }
    }

    private endsWith(val: string, suffix: string): boolean {
        return val.indexOf(suffix, val.length - suffix.length) !== -1;
    }

    private insertPos(str: string, idx: number, val: string): string {
        return str.substr(0, idx) + val + str.substr(idx);
    }

    private getPartLength(idx: number): number {
        return this.opts.formatParts[idx].length;
    }

    private isNumber(val: string): boolean {
        return val.match(/[1-9]/) !== null;
    }

    private isDay(idx: number): boolean {
        return this.opts.formatParts[idx].indexOf("d") !== -1;
    }

    private isMonth(idx: number): boolean {
        return this.opts.formatParts[idx].indexOf("m") !== -1 && this.opts.formatParts[idx].length === 2;
    }

    private getInputValue(): string {
        return this.el.nativeElement.value;
    }

    private setInputValue(val: string): void {
        this.rndr.setElementProperty(this.el.nativeElement, "value", val);
    }
}