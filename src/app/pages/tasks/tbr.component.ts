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
}

@Component({
  selector: 'app-tbr',
  imports: [FormsModule, CommonModule, DateFormatterPipe, CustomTextColor, HighlightOnHoverDirective ],
  templateUrl: './tbr.component.html',
  styleUrl: './tbr.component.scss',
  standalone: true
})

export class TBRComponent implements OnInit {
  @Input() title: string = 'To-Be-Read Lista';
  @Output() bookAdded = new EventEmitter<TBR>();
  
  newBookName: string = '';
  newAuthor: string = '';
  newBookPriority: 'Magas' | 'Közepes' | 'Alacsony' = 'Alacsony';
  
  konyvek: TBR[] = [
    {
      id: 1,
      title: 'Az aratás hajnala',
      completed: false,
      priority: 'Magas',
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Prédák háza',
      completed: false,
      priority: 'Közepes',
      dueDate: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Démoni ketrec',
      completed: false,
      priority: 'Közepes',
      dueDate: new Date().toISOString()
    }
  ];

  ngOnInit(): void {
    this.konyvek = this.konyvek.map(konyv => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return {
        ...konyv,
        dueDate: date.toISOString()
      };
    });
  }

  addBook(): void {
    if (this.newBookName.trim()) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate());
      
      const newBook: TBR = {
        id: this.konyvek.length + 1,
        title: this.newBookName.trim(),
        completed: false,
        priority: this.newBookPriority,
        dueDate: dueDate.toISOString()
      };
      
      this.konyvek.push(newBook);
      this.bookAdded.emit(newBook);
      this.newBookName = '';
    }
  }

  toggleBookCompletion(konyv: TBR): void {
    konyv.completed = !konyv.completed;
  }

  trackById(index: number, item: TBR): number {
    return item.id;
  }
}