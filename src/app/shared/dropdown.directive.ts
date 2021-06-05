import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive ({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // @HostBinding('class.open') clicked = false;
    clicked = false;
    constructor(private elRef: ElementRef) {

    }

    @HostListener('click') onClick(eventData: Event): void {
        if (this.clicked) {
            this.elRef.nativeElement.classList.remove('open');
        } else {
            this.elRef.nativeElement.classList.add('open');
        }
        this.clicked = !this.clicked;
    }
}
