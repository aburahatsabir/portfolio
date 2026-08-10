import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
    send: vi.fn()
}));

// Mock analytics
vi.mock('../../utils/analytics', () => ({
    trackFormSubmission: vi.fn(),
    trackCustomEvent: vi.fn()
}));

// Mock Sentry
vi.mock('../../utils/sentry', () => ({
    captureError: vi.fn()
}));

describe('ContactForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('renders form fields correctly', () => {
        render(<ContactForm />);

        expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/subject/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    });

    it('validates required fields before submission', async () => {
        const { send } = await import('@emailjs/browser');
        render(<ContactForm />);
        const user = userEvent.setup();

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Form should not submit without required fields
        expect(send).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
        const { send } = await import('@emailjs/browser');
        (send as any).mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test Subject');
        await user.type(screen.getByPlaceholderText(/your message/i), 'This is a test message with enough content to pass validation.');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(send).toHaveBeenCalledTimes(1);
        }, { timeout: 3000 });
    });

    it('shows success message after submission', async () => {
        const { send } = await import('@emailjs/browser');
        (send as any).mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message content here');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('disables submit button while submitting', async () => {
        const { send } = await import('@emailjs/browser');
        (send as any).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ status: 200, text: 'OK' }), 500))
        );

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Button should be disabled during submission
        expect(submitButton).toBeDisabled();
    });

    it('clears form after successful submission', async () => {
        const { send } = await import('@emailjs/browser');
        (send as any).mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        const nameInput = screen.getByPlaceholderText(/your name/i) as HTMLInputElement;
        await user.type(nameInput, 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(nameInput.value).toBe('');
        }, { timeout: 3000 });
    });

    it('validates email format', async () => {
        const { send } = await import('@emailjs/browser');
        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'invalid-email');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        // Should not submit with invalid email
        expect(send).not.toHaveBeenCalled();
    });

    it('transitions through state machine correctly', async () => {
        const { send } = await import('@emailjs/browser');
        (send as any).mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        // Initial state: idle
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();

        await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(submitButton);

        // State: submitting (button disabled)
        expect(submitButton).toBeDisabled();

        // State: success
        await waitFor(() => {
            expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});
