import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../../shared/models/Book';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';  // szükséges az ngModel-hez
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection, query, orderBy } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-konyvlista',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterModule],
  templateUrl: './konyvlista.component.html',
  styleUrls: ['./konyvlista.component.scss']
})
export class KonyvlistaComponent implements OnInit {
  books: Book[] = [];
  
  // A szűréshez/rendezéshez szükséges változó
  selectedSort: string = 'az';  // alapértelmezett

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    const booksRef = collection(this.firestore, 'konyvek');

    let q;

    switch(this.selectedSort) {
      case 'az':
        q = query(booksRef, orderBy('title', 'asc'));
        break;
      case 'za':
        q = query(booksRef, orderBy('title', 'desc'));
        break;
      case 'priceAsc':
        q = query(booksRef, orderBy('price', 'asc'));
        break;
      case 'priceDesc':
        q = query(booksRef, orderBy('price', 'desc'));
        break;
      default:
        q = query(booksRef);
    }

    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.books = data as Book[];
    });
  }

  onSortChange() {
    this.loadBooks();
  }
}
