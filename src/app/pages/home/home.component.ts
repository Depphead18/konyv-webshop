import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../../shared/models/Book';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topBooks: Book[] = [];

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getTopBooksByDate().subscribe(data => {
      this.topBooks = data;
    });
  }

  changePage() {
    this.router.navigateByUrl("/konyvlista");
  }
}
