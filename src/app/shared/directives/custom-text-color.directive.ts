import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})

export class CustomTextColor implements OnChanges {
    @Input() appCustomColor: boolean = false;  // Az input az állapotot fogja kezelni
  
    constructor(private elementRef: ElementRef) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['appCustomColor']) {
        if (this.appCustomColor) {
          this.elementRef.nativeElement.style.color = 'green';  // Ha completed, zöld lesz
        } else {
          this.elementRef.nativeElement.style.color = '';  // Ha nem completed, visszaáll a normál szín
        }
      }
    }
  }
