import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { TBR } from '../models/TBR';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TBRService {
  constructor(private firestore: Firestore) {}

  getAllBooks(): Observable<TBR[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<TBR[]>;
  }

  addBook(book: Omit<TBR, 'id'>): Promise<TBR> {
    const booksRef = collection(this.firestore, 'books');
    return addDoc(booksRef, book).then(docRef => {
      return { ...book, id: docRef.id }; // a Firestore generálja az ID-t
    });
  }

  removeTaskById(id: number | string): void {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    deleteDoc(bookDocRef);
  }

  updateTaskCompletion(id: number | string, completed: boolean): void {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    updateDoc(bookDocRef, { completed });
  }
}
