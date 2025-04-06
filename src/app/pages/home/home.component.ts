import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("/konyvlista");
  }

  topBooks = [
    {
      title: "The Women",
      author: "Kristin Hannah",
      price: 6500,
      image: "https://m.media-amazon.com/images/I/913C+MR3S5L._SY466_.jpg"
    },
    {
      title: "Yellowface",
      author: "R.F. Kuang",
      price: 7200,
      image: "https://m.media-amazon.com/images/I/312-c2-bYwL._SY445_SX342_.jpg"
    },
    {
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      price: 6800,
      image: "https://m.media-amazon.com/images/I/61dEdpy80UL._SY445_SX342_.jpg"
    },
    {
      title: "Funny Story",
      author: "Emily Henry",
      price: 7000,
      image: "https://m.media-amazon.com/images/I/71ajiVevZgL._SY466_.jpg"
    },
    {
      title: "James",
      author: "Percival Everett",
      price: 6900,
      image: "https://m.media-amazon.com/images/I/41xBkE-i2oL._SY445_SX342_.jpg"
    },
  ];
}