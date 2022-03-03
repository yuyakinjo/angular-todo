import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  readonly form = new FormControl('');

  constructor(private todoService: TodoService) {}

  add() {
    this.todoService.add(this.form.value);
    this.form.setValue('');
  }
}
