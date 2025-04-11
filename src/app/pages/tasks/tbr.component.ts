import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';
import { CustomTextColor } from '../../shared/directives/custom-text-color.directive';
import { HighlightOnHoverDirective } from '../../shared/directives/appHighlightOnHover';

export interface TBR {
  id: number;
  title: string;
  completed: boolean;
  priority: 'Magas' | 'Közepes' | 'Alacsony';
  dueDate: string;
  addedDate: string;
}

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
  
  konyvek: TBR[] = [
    {
      id: 1,
      title: 'Az aratás hajnala',
      completed: false,
      priority: 'Magas',
      dueDate: new Date().toISOString(),
      addedDate: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Prédák háza',
      completed: false,
      priority: 'Közepes',
      dueDate: new Date().toISOString(),
      addedDate: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Démoni ketrec',
      completed: false,
      priority: 'Közepes',
      dueDate: new Date().toISOString(),
      addedDate: new Date().toISOString()
    }
  ];

  ngOnInit(): void {
    this.konyvek = this.konyvek.map(konyv => {
      const date = new Date();
      date.setDate(date.getDate());
      return {
        ...konyv,
        dueDate: date.toISOString()
      };
    });
  }

  addBook(): void {
    if (this.newBookName.trim()) {
      const newBook: TBR = {
        id: Date.now(), // Use timestamp for unique ID
        title: this.newBookName.trim(),
        completed: false,
        priority: this.newBookPriority,
        dueDate: new Date().toISOString(),
        addedDate: new Date().toISOString()
      };
      
      this.konyvek.unshift(newBook); // Add to beginning of array
      this.bookAdded.emit(newBook);
      this.newBookName = '';
    }
  }

  deleteBook(id: number): void {
    this.konyvek = this.konyvek.filter(konyv => konyv.id !== id);
  }

  toggleBookCompletion(konyv: TBR): void {
    konyv.completed = !konyv.completed;
  }

  trackById(index: number, item: TBR): number {
    return item.id;
  }

  getTotalBooks(): number {
    return this.konyvek.length;
  }

  getCompletedBooks(): number {
    return this.konyvek.filter(konyv => konyv.completed).length;
  }

  getPendingBooks(): number {
    return this.konyvek.filter(konyv => !konyv.completed).length;
  }

  getPriorityIcon(priority: string): string {
    switch(priority) {
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
    return diffDays < 3; // New if added in last 3 days
  }
}