import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../shared/services/cart.service';
import { Book } from '../../shared/models/Book';
import { MatIconModule } from '@angular/material/icon';
import { PriceWithCurrencyPipe } from '../../shared/pipes/price-with-currency.pipe';

@Component({
  selector: 'app-kosar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, PriceWithCurrencyPipe],
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss']
})
export class KosarComponent {
  cartBooks: Book[] = [];

  constructor(private cartService: CartService) {
    this.cartService.cartBooks$.subscribe(books => {
      this.cartBooks = books;
    });
  }

  get totalPrice(): number {
    return this.cartBooks.reduce((sum, book) => sum + book.price, 0);
  }

  removeBook(book: Book): void {
    this.cartService.removeBook(book);
  }

  fizetes(): void {
    alert('Fizetés sikeres! 🧾');
    this.cartService.clearCart();
  }
}
