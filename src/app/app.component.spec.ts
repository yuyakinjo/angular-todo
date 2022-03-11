import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

const name = 'AppComponent';

describe(name, () => {
  it(`should render ${name}`, async () => {
    await render(AppComponent);

    expect(screen.getByText('TODO')).toBeDefined();
  });
});
