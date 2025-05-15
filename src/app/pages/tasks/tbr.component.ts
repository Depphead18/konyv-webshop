import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';
import { CustomTextColor } from '../../shared/directives/custom-text-color.directive';
import { HighlightOnHoverDirective } from '../../shared/directives/appHighlightOnHover';
import { TBRService } from '../../shared/services/tbr-service.service';
import { TBR } from '../../shared/models/TBR';

@Component({
  selector: 'app-tbr',
  imports: [FormsModule, CommonModule, DateFormatterPipe, CustomTextColor, HighlightOnHoverDirective],
  templateUrl: './tbr.component.html',
  styleUrl: './tbr.component.scss',
  standalone: true
})
export class TBRComponent implements OnInit {
  @Input() title: string = 'To-Be-Read Lista';
  @Output() bookAdded = new EventEmitter<TBR>();
  
  newBookName: string = '';
  priorities: ('Magas' | 'Közepes' | 'Alacsony')[] = ['Magas', 'Közepes', 'Alacsony'];
  newBookPriority: 'Magas' | 'Közepes' | 'Alacsony' = 'Alacsony';
  
  konyvek: TBR[] = [];

  constructor(private tbrService: TBRService) {}

  ngOnInit(): void {
    this.tbrService.getAllBooks().subscribe(books => {
      this.konyvek = books;
    });
  }

  addBook(): void {
    if (this.newBookName.trim()) {
      const taskData = {
        title: this.newBookName.trim(),
        completed: false,
        priority: this.newBookPriority,
        dueDate: new Date().toISOString(),
        addedDate: new Date().toISOString()
      };

      this.tbrService.addBook(taskData).then(newBook => {
        this.bookAdded.emit(newBook);
        this.newBookName = '';
      });
    }
  }

  deleteBook(id: number): void {
    this.konyvek = this.konyvek.filter(k => k.id !== id);
    this.tbrService.removeTaskById(id); // Ezt a metódust külön létre kell hozni, lásd lent.
  }

  toggleBookCompletion(konyv: TBR): void {
    konyv.completed = !konyv.completed;
    this.tbrService.updateTaskCompletion(konyv.id, konyv.completed); // ezt is létrehozzuk lent
  }

  trackById(index: number, item: TBR): number {
    return item.id;
  }

  getTotalBooks(): number {
    return this.konyvek.length;
  }

  getCompletedBooks(): number {
    return this.konyvek.filter(k => k.completed).length;
  }

  getPendingBooks(): number {
    return this.konyvek.filter(k => !k.completed).length;
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'Magas': return '🔥';
      case 'Közepes': return '⚠️';
      case 'Alacsony': return '🌿';
      default: return '';
    }
  }

  isNew(konyv: TBR): boolean {
    const addedDate = new Date(konyv.addedDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays < 3;
  }
}