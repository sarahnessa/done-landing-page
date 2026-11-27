import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

class TestIntersectionObserver {
  static instances: TestIntersectionObserver[] = [];
  target: Element | null = null;
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    TestIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.target = target;
  }
  unobserve() {}
  disconnect() {}

  enterViewport() {
    if (!this.target) return;
    this.callback(
      [
        {
          target: this.target,
          isIntersecting: true,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

function renderApp() {
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
}

describe('accessibility', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;

  beforeAll(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: TestIntersectionObserver,
    });
  });

  afterAll(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: originalIntersectionObserver,
    });
  });

  it('activates scroll headlines when they enter the viewport', async () => {
    TestIntersectionObserver.instances = [];
    renderApp();
    const headline = screen.getByText('Pricing.');
    const observer = TestIntersectionObserver.instances.find(
      (instance) => instance.target === headline,
    );

    expect(observer).toBeTruthy();
    observer?.enterViewport();
    await waitFor(() => expect(headline.classList.contains('active')).toBe(true));
  });

  it('has no axe violations on the landing page', async () => {
    const { container } = renderApp();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('exposes labeled task controls and billing state to assistive technology', async () => {
    renderApp();
    const task = screen.getByRole('button', {
      name: /mark complete: buy groceries/i,
    });
    expect(task.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(task);
    expect(screen.queryByText(/buy groceries/i)).toBeNull();
    const nextTask = screen.getByRole('button', {
      name: /mark complete: finish chapter 4/i,
    });
    expect(document.activeElement).toBe(nextTask);

    const billingSwitch = screen.getByRole('switch', {
      name: 'Annual billing',
    });
    fireEvent.click(billingSwitch);
    expect(billingSwitch.getAttribute('aria-checked')).toBe('true');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('resets completed demo tasks when the page is mounted again', () => {
    const firstVisit = renderApp();
    fireEvent.click(screen.getByRole('button', { name: /mark complete: buy groceries/i }));
    expect(screen.queryByText(/buy groceries/i)).toBeNull();

    firstVisit.unmount();
    renderApp();

    expect(screen.getByRole('button', { name: /mark complete: buy groceries/i })).toBeTruthy();
  });

  it('provides accessible labels for task and subscription inputs', () => {
    renderApp();
    expect(screen.getByLabelText('New task')).toBeTruthy();
    expect(screen.getByLabelText('Email address')).toBeTruthy();
  });
});
