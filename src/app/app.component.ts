import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  todos = new Map([
    ['todo1', new Date()],
    ['todo2', new Date()],
    ['todo3', new Date()],
  ]);
}
