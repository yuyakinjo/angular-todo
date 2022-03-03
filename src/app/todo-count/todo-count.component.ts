import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-count',
  templateUrl: './todo-count.component.html',
  styleUrls: ['./todo-count.component.scss'],
})
export class TodoCountComponent {
  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}
}
