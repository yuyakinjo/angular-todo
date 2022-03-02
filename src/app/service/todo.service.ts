import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #snapshot = Object.entries<boolean>(JSON.parse(localStorage.getItem('snapshot') ?? '{}'));

  readonly todos = new Map<string, boolean>(this.#snapshot);

  #todos$ = new BehaviorSubject(this.todos);

  readonly todos$ = this.#todos$.asObservable();

  add(title: string) {
    if (!title) return;
    this.todos.set(title, false);
    this.#todos$.next(this.todos);
    this.#snapshotUpdate();
  }

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
    this.#todos$.next(this.todos);
    this.#snapshotUpdate();
  }

  delete(title: string) {
    this.todos.delete(title);
    this.#todos$.next(this.todos);
    this.#snapshotUpdate();
  }

  #snapshotUpdate() {
    localStorage.setItem('snapshot', JSON.stringify(Object.fromEntries(this.todos)));
  }
}
