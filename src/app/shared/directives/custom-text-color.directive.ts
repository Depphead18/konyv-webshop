import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})

export class CustomTextColor implements OnChanges {
    @Input() appCustomColor: boolean = false;
  
    constructor(private elementRef: ElementRef) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['appCustomColor']) {
        if (this.appCustomColor) {
          this.elementRef.nativeElement.style.color = 'green';
        } else {
          this.elementRef.nativeElement.style.color = '';
        }
      }
    }
  }
