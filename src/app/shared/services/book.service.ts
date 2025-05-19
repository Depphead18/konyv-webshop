import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy, limit, doc, docData, updateDoc, where } from '@angular/fire/firestore';
import { Book } from '../models/Book';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private firestore: Firestore) {}

  getBooks(): Observable<Book[]> {
    const booksRef = collection(this.firestore, 'konyvek');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }

  getTopBooksByDate(): Observable<Book[]> {
    const booksRef = query(
      collection(this.firestore, 'konyvek'),
      orderBy('megjelenesDatuma', 'desc'),
      limit(5)
    );
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }

  getBookById(id: string): Observable<Book> {
    const bookDoc = doc(this.firestore, `konyvek/${id}`);
    return docData(bookDoc, { idField: 'id' }) as Observable<Book>;
  }

  updateBook(id: string, book: Book): Observable<void> {
    const bookDoc = doc(this.firestore, `konyvek/${id}`);
    return from(updateDoc(bookDoc, { ...book }));
  }

  getTopRomanceBooksByDate(): Observable<Book[]> {
    const booksRef = query(
      collection(this.firestore, 'konyvek'),
      where('genre', '==', 'Romantikus'),
      orderBy('megjelenesDatuma', 'desc'),
      limit(5)
    );
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }
}
