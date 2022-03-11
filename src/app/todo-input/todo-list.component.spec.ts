import { render, screen } from '@testing-library/angular';
import { TodoInputComponent } from './todo-input.component';

const name = 'TodoInputComponent';

describe(name, () => {
  it(`should render placeholder`, async () => {
    await render(TodoInputComponent);
    const placeholder = await screen.findByPlaceholderText('タイトルを入力してください');
    expect(placeholder).toBeDefined();
  });
});
