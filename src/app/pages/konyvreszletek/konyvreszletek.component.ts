import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../../shared/models/Book';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../shared/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-konyvreszletek',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './konyvreszletek.component.html',
  styleUrls: ['./konyvreszletek.component.scss']
})
export class KonyvReszletekComponent implements OnInit {
  book?: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
      });
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addBook(this.book);
      alert(`"${this.book.title}" hozzáadva a kosárhoz!`);
    }
  }
}
