import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  headline = 'todo';

  readonly form = new FormControl('');

  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  add() {
    this.todoService.add(this.form.value);
    this.form.setValue('');
  }
}
