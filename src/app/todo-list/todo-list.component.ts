import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Confirm } from '../decorators';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() status = false;

  @Input() doneLabel = '完了';

  @Input() inProcessLabel = '未完了';

  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todoService.changeStatus(todo);
  }

  @Confirm('削除してもいいですか？')
  remove(title: string) {
    this.todoService.delete(title);
  }
}
