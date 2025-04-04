import { Component, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  
  constructor(){
    console.log('c');
  }

  ngOnInit(): void{
    console.log("ng");
  }

  ngAfterViewInit(): void {
    console.log('');
  }

  menuSwitch(pageValue: string){
    this.selectedPage.emit(pageValue);
  }
}
