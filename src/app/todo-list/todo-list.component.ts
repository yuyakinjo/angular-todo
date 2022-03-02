import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todos = new Map();

  @Input() status = false;

  backup() {
    localStorage.setItem('snapshot', JSON.stringify(Object.fromEntries(this.todos)));
  }

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
    this.backup();
  }

  remove(title: string) {
    this.todos.delete(title);
    this.backup();
  }
}
