import { Component } from '@angular/core';
import {ProfileObject} from '../../shared/constants';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileObject: any = ProfileObject;
  selectedIndex: number = 0;

  ngOnInit(): void{
    this.selectedIndex;
    console.log([...ProfileObject]);
   
  }

  reload (index: number): void{
    this.selectedIndex = index;
  }
}
