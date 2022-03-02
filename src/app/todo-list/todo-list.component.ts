import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() status = false;

  @Input() doneLabel = '完了';

  @Input() inProcessLabel = '未完了';

  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todoService.changeStatus(todo);
  }

  remove(title: string) {
    this.todoService.delete(title);
  }
}
