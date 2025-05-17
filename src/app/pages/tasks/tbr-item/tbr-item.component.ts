import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TBR } from '../../../shared/models/TBR';
import { DateFormatterPipe } from "../../../shared/pipes/date.pipe";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './tbr-item.component.html',
  styleUrl: './tbr-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: TBR;
  @Output() complete = new EventEmitter<TBR>();

  toggleComplete(): void {
    this.complete.emit(this.task);
  }
}