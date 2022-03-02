import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #snapshot = Object.entries<boolean>(JSON.parse(localStorage.getItem('snapshot') ?? '{}'));

  readonly todos = new Map<string, boolean>(this.#snapshot);

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
    this.backup();
  }

  backup() {
    localStorage.setItem('snapshot', JSON.stringify(Object.fromEntries(this.todos)));
  }

  delete(title: string) {
    this.todos.delete(title);
    this.backup();
  }
}
