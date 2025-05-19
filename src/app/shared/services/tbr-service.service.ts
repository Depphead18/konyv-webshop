import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from '@angular/fire/firestore';
import { TBR } from '../models/TBR';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TBRService {
  constructor(private firestore: Firestore) {}

  getBooksByUser(userId: string): Observable<TBR[]> {
    const booksRef = collection(this.firestore, 'books');
    const q = query(booksRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<TBR[]>;
  }

  addBook(book: Omit<TBR, 'id'>): Promise<TBR> {
    const booksRef = collection(this.firestore, 'books');

    const bookWithTimestamp = {
      ...book,
      addedDate: serverTimestamp() as unknown as any // workaround a típuskezelésre
    };

    return addDoc(booksRef, bookWithTimestamp).then(docRef => {
      return { ...book, id: docRef.id };  // itt az addedDate már a szerver oldali lesz lekérdezésnél
    });
  }


  // FIRESTORE LEKÉRDEZÉS

  getRecentBooksByUser(userId: string): Observable<TBR[]> {
    const booksRef = collection(this.firestore, 'books');
    const q = query(
      booksRef,
      where('userId', '==', userId),
      where('addedDate', '!=', null),
      orderBy('addedDate', 'desc'),
      limit(10)
    );
    return collectionData(q, { idField: 'id' }) as Observable<TBR[]>;
  }


  removeTaskById(id: string): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookDocRef);
  }

  updateTaskCompletion(id: string, completed: boolean): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return updateDoc(bookDocRef, { completed });
  }
}
