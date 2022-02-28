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

  todos = new Map<string, boolean>(Object.entries(JSON.parse(localStorage.getItem('backup') ?? '{}')));

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
    localStorage.setItem('backup', JSON.stringify(Object.fromEntries(this.todos)));
  }

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
    localStorage.setItem('backup', JSON.stringify(Object.fromEntries(this.todos)));
  }

  remove(title: string) {
    this.todos.delete(title);
    localStorage.setItem('backup', JSON.stringify(Object.fromEntries(this.todos)));
  }
}
