import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';
import { CustomTextColor } from '../../shared/directives/custom-text-color.directive';
import { HighlightOnHoverDirective } from '../../shared/directives/appHighlightOnHover';
import { TBRService } from '../../shared/services/tbr-service.service';
import { TBR } from '../../shared/models/TBR';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tbr',
  standalone: true,
  imports: [FormsModule, CommonModule, DateFormatterPipe, CustomTextColor, HighlightOnHoverDirective],
  templateUrl: './tbr.component.html',
  styleUrl: './tbr.component.scss'
})
export class TBRComponent implements OnInit, OnDestroy {
  @Input() title: string = 'To-Be-Read Lista';
  @Output() bookAdded = new EventEmitter<TBR>();

  konyvek: TBR[] = [];
  userId: string | null = null;
  isLoading = true;
  newBookName: string = '';
  priorities: ('Magas' | 'Közepes' | 'Alacsony')[] = ['Magas', 'Közepes', 'Alacsony'];
  newBookPriority: 'Magas' | 'Közepes' | 'Alacsony' = 'Alacsony';

  private subscription: Subscription | null = null;

  constructor(private tbrService: TBRService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.subscription = this.authService.currentUser.subscribe(user => {
      this.userId = user?.uid || null;

      if (this.userId) {
        this.tbrService.getAllBooks().subscribe(books => {
          this.konyvek = books.filter(b => b.userId === this.userId);
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      } else {
        this.konyvek = [];
        this.isLoading = false;
      }
    });
  }

  addBook(): void {
    if (this.newBookName.trim() && this.userId) {
      const taskData = {
        title: this.newBookName.trim(),
        completed: false,
        priority: this.newBookPriority,
        addedDate: new Date().toISOString(),
        userId: this.userId
      };

      this.tbrService.addBook(taskData).then(newBook => {
        this.bookAdded.emit(newBook);
        this.newBookName = '';
      });
    }
  }

  deleteBook(id: string): void {
    this.konyvek = this.konyvek.filter(k => k.id !== id);
    this.tbrService.removeTaskById(id);
  }

  toggleBookCompletion(konyv: TBR): void {
    konyv.completed = !konyv.completed;
    this.tbrService.updateTaskCompletion(konyv.id, konyv.completed);
  }

  trackById(index: number, item: TBR): string {
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}