import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  headline = 'todo';

  readonly form = new FormControl('');

  categories = [
    { title: '未完了', status: false },
    { title: '完了', status: true },
  ] as const;

  snapshot = Object.entries<boolean>(JSON.parse(localStorage.getItem('snapshot') ?? '{}'));

  todos = new Map<string, boolean>(this.snapshot);

  backup() {
    localStorage.setItem('snapshot', JSON.stringify(Object.fromEntries(this.todos)));
  }

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
    this.backup();
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
