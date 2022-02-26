import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  readonly form = new FormControl('');

  todos = new Map<string, boolean>();

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
  }

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
  }
}
