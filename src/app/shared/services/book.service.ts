import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private firestore: Firestore) {}

  getBooks(): Observable<Book[]> {
    const booksRef = collection(this.firestore, 'konyvek'); // Firestore gyűjtemény neve
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }
}
