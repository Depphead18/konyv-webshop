import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-kosar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss']
})
export class KosarComponent {
  cartBooks = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 4500, image: 'https://m.media-amazon.com/images/I/712cDO7d73L.jpg' },
    { title: '1984', author: 'George Orwell', price: 3900, image: 'https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 4200, image: 'https://cdn.kobo.com/book-images/b8121c19-4eeb-4e75-be4c-cfeb81b16a9b/1200/1200/False/to-kill-a-mockingbird-3.jpg' }
  ];

  get totalPrice(): number {
    return this.cartBooks.reduce((sum, book) => sum + book.price, 0);
  }

  fizetes() {
    alert('Fizetés sikeres! 🧾');
    this.cartBooks = [];
  }
}
