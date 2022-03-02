import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-count',
  templateUrl: './todo-count.component.html',
  styleUrls: ['./todo-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCountComponent {
  readonly count$ = this.todoService.todos$.pipe(map((todos) => todos.size));

  constructor(private todoService: TodoService) {}
}
