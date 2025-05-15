import { Injectable } from '@angular/core';
import { TBR } from '../models/TBR';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TBRService {
  private konyvek: TBR[] = [
    { id: 1, title: 'Az aratás hajnala', completed: false, priority: 'Magas', dueDate: new Date().toISOString(), addedDate: new Date().toISOString() },
    { id: 2, title: 'Prédák háza', completed: false, priority: 'Közepes', dueDate: new Date().toISOString(), addedDate: new Date().toISOString() },
    { id: 3, title: 'Démoni ketrec', completed: false, priority: 'Közepes', dueDate: new Date().toISOString(), addedDate: new Date().toISOString() }
  ];

  private booksSubject = new BehaviorSubject<TBR[]>(this.konyvek);

  constructor() {}

  getAllBooks(): Observable<TBR[]> {
    return this.booksSubject.asObservable();
  }

  addBook(book: Omit<TBR, 'id'>): Promise<TBR> {
    return new Promise((resolve) => {
      const newId = this.konyvek.length > 0 ? Math.max(...this.konyvek.map(t => t.id)) + 1 : 1;
      const newBook: TBR = { ...book, id: newId };
      this.konyvek.push(newBook);
      this.booksSubject.next([...this.konyvek]);
      setTimeout(() => resolve(newBook), 1000);
    });
  }

  removeTaskById(id: number): void {
    this.konyvek = this.konyvek.filter(book => book.id !== id);
    this.booksSubject.next([...this.konyvek]);
  }

  updateTaskCompletion(id: number, completed: boolean): void {
    const index = this.konyvek.findIndex(book => book.id === id);
    if (index !== -1) {
      this.konyvek[index].completed = completed;
      this.booksSubject.next([...this.konyvek]);
    }
  }
}
