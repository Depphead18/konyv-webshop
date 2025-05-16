import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../../shared/models/Book';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-konyv-szerkesztes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './konyvszerkesztes.component.html',
  styleUrls: ['./konyvszerkesztes.component.scss']
})
export class KonyvSzerkesztesComponent implements OnInit {
  book?: Book;

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
    megjelenesDatuma: new FormControl(null),
    image: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
  if (this.bookForm.valid && this.book?.id) {
    const updatedBook = { ...this.book, ...this.bookForm.value };
    this.bookService.updateBook(this.book.id, updatedBook).subscribe(() => {
      alert('Könyv sikeresen frissítve!');
      this.router.navigate(['/konyvlista']);
    });
  }
}
}
