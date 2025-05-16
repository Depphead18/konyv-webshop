import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBooksSubject = new BehaviorSubject<Book[]>([]);
  cartBooks$ = this.cartBooksSubject.asObservable();

  get cartBooks(): Book[] {
    return this.cartBooksSubject.value;
  }

  addBook(book: Book): void {
    this.cartBooksSubject.next([...this.cartBooks, book]);
  }

  removeBook(bookToRemove: Book): void {
    const updatedBooks = this.cartBooks.filter(book => book.id !== bookToRemove.id);
    this.cartBooksSubject.next(updatedBooks);
  }

  clearCart(): void {
    this.cartBooksSubject.next([]);
  }
}
