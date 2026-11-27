import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import App from '../App';

function renderApp() {
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
}

describe('App', () => {
  it('renders main landmarks and interactive todo demo', () => {
    renderApp();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('3 remaining')).toBeInTheDocument();

    const input = screen.getByLabelText('New task');
    fireEvent.change(input, { target: { value: 'Write Vitest suite' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('4 remaining')).toBeInTheDocument();
    const newTaskBtn = screen.getByRole('button', {
      name: 'Mark complete: Write Vitest suite',
    });
    expect(newTaskBtn).toBeInTheDocument();

    fireEvent.click(newTaskBtn);
    expect(screen.getByText('3 remaining')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: 'Mark complete: Write Vitest suite',
      }),
    ).not.toBeInTheDocument();
  });

  it('toggles between monthly and annual pricing', () => {
    renderApp();

    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$15')).toBeInTheDocument();

    const billingSwitch = screen.getByRole('switch', {
      name: 'Annual billing',
    });
    expect(billingSwitch).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(billingSwitch);

    expect(billingSwitch).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('$7')).toBeInTheDocument();
    expect(screen.getByText('$12')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderApp();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
