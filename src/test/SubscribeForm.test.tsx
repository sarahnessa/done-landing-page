import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import emailjs from '@emailjs/browser';
import SubscribeForm from '../SubscribeForm';

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(),
  },
}));

describe('SubscribeForm', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_test');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('submits email successfully and resets the input', async () => {
    vi.mocked(emailjs.sendForm).mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    });

    render(<SubscribeForm />);

    const input = screen.getByLabelText('Email address') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'alex@example.com' } });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(/subscribing/i);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Thank you for subscribing!');
    });

    expect(input.value).toBe('');
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      'service_test',
      'template_test',
      expect.any(HTMLFormElement),
      { publicKey: 'public_test' },
    );
  });

  it('displays an alert when EmailJS environment variables are missing', () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');

    render(<SubscribeForm />);

    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: 'alex@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Subscription is unavailable right now. Please try again later.',
    );
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it('displays an error alert when emailjs.sendForm rejects', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(emailjs.sendForm).mockRejectedValueOnce(new Error('Network error'));

    render(<SubscribeForm />);

    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: 'alex@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Something went wrong. Please try again.',
      );
    });

    consoleSpy.mockRestore();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SubscribeForm />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
