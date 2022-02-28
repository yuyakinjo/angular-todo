import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'done',
})
export class DonePipe implements PipeTransform {
  transform(todos: KeyValue<string, boolean>[], done = false) {
    return todos.filter(({ value }) => value === done);
  }
}
