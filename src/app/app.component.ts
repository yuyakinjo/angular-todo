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

  snapshot = Object.entries<boolean>(JSON.parse(localStorage.getItem('snapshot') ?? '{}'));

  todos = new Map<string, boolean>(this.snapshot);

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
    this.backup();
  }

  backup() {
    localStorage.setItem('snapshot', JSON.stringify(Object.fromEntries(this.todos)));
  }
}
