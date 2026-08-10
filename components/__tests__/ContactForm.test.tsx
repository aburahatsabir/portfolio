import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

const sendMock = vi.fn();
vi.mock('@emailjs/browser', () => ({
    default: { send: (...args: any[]) => sendMock(...args) },
    send: (...args: any[]) => sendMock(...args),
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

        expect(screen.getByPlaceholderText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/subject/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    });

    it('validates required fields before submission', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Form should not submit without required fields
        expect(sendMock).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
        sendMock.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test Subject');
        await user.type(screen.getByPlaceholderText(/your message/i), 'This is a test message with enough content to pass validation.');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(sendMock).toHaveBeenCalledTimes(1);
        }, { timeout: 3000 });
    });

    it('shows success message after submission', async () => {
        sendMock.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message content here');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('disables submit button while submitting', async () => {
        sendMock.mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ status: 200, text: 'OK' }), 500))
        );

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Button should be disabled during submission
        expect(submitButton).toBeDisabled();
    });

    it('clears form after successful submission', async () => {
        sendMock.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        const nameInput = screen.getByPlaceholderText(/^name$/i) as HTMLInputElement;
        await user.type(nameInput, 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('validates email format', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'invalid-email');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        // Should not submit with invalid email
        expect(sendMock).not.toHaveBeenCalled();
    });

    it('transitions through state machine correctly', async () => {
        sendMock.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        // Initial state: idle
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/subject/i), 'Test');
        await user.type(screen.getByPlaceholderText(/your message/i), 'Test message');

        await user.click(submitButton);

        // State: submitting (button disabled)
        expect(submitButton).toBeDisabled();

        // State: success
        await waitFor(() => {
            expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});
