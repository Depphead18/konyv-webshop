import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-konyvlista',
  imports: [CommonModule, MatCardModule, MatGridListModule], // Modulok importálása itt
  templateUrl: './konyvlista.component.html',
  styleUrls: ['./konyvlista.component.scss']
})
export class KonyvlistaComponent {
  books = [
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
    {
      title: "Iron Flame",
      author: "Rebecca Yarros",
      price: 6800,
      image: "https://m.media-amazon.com/images/I/61CrGbiVSnL._SY445_SX342_.jpg"
    },
    {
      title: "Tom Lake",
      author: "Ann Patchett",
      price: 6700,
      image: "https://m.media-amazon.com/images/I/51F4TgwRlyL._SY445_SX342_.jpg"
    },
    {
      title: "Remarkably Bright Creatures",
      author: "Shelby Van Pelt",
      price: 6600,
      image: "https://m.media-amazon.com/images/I/51fMaH1tRyL._SY445_SX342_.jpg"
    },
    {
      title: "A Court of Thorns and Roses",
      author: "Sarah J. Maas",
      price: 7100,
      image: "https://m.media-amazon.com/images/I/81RrEEMiOCL._SY466_.jpg"
    },
    {
      title: "A Fragile Enchantment",
      author: "Allison Saft",
      price: 6900,
      image: "https://m.media-amazon.com/images/I/51u+Cxs8gjL._SY445_SX342_.jpg"
    },
    {
      title: "House of Glass",
      author: "Sarah Pekkanen",
      price: 7200,
      image: "https://m.media-amazon.com/images/I/41wQh+x8JuL._SY445_SX342_.jpg"
    },
    {
      title: "The Familiar",
      author: "Leigh Bardugo",
      price: 7000,
      image: "https://m.media-amazon.com/images/I/71aG78k1IbL._SY466_.jpg"
    },
    {
      title: "Wandering Stars",
      author: "Tommy Orange",
      price: 7300,
      image: "https://m.media-amazon.com/images/I/51EQC0ve6EL._SY445_SX342_.jpg"
    },
    {
      title: "The Paris Apartment",
      author: "Lucy Foley",
      price: 6800,
      image: "https://m.media-amazon.com/images/I/51+1WHxa3-L._SY445_SX342_.jpg"
    },
    {
      title: "The Warm Hands of Ghosts",
      author: "Katherine Arden",
      price: 6900,
      image: "https://m.media-amazon.com/images/I/51TygSXol2L._SY445_SX342_.jpg"
    }
  ];
  
  
}
