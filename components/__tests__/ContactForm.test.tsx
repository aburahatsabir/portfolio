import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

const { mockSend } = vi.hoisted(() => ({
    mockSend: vi.fn()
}));

vi.mock('@emailjs/browser', () => ({
    default: { send: mockSend },
    send: mockSend
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
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test');
        vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_test');
        vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_test');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('renders form fields correctly', () => {
        render(<ContactForm />);

        expect(screen.getByPlaceholderText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/^what’s this about\?$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/role or support you need/i)).toBeInTheDocument();
    });

    it('validates required fields before submission', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Form should not submit without required fields
        expect(mockSend).not.toHaveBeenCalled();
    });

    it('fails closed and shows a direct email fallback when configuration is missing', () => {
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');
        vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', '');
        vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', '');

        render(<ContactForm />);

        expect(screen.getByText(/secure form is temporarily unavailable/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /aburahatsabir178@gmail.com/i })).toHaveAttribute(
            'href',
            'mailto:aburahatsabir178@gmail.com',
        );
        expect(screen.getByRole('button', { name: /form unavailable/i })).toBeDisabled();
    });

    it('submits form with valid data', async () => {
        mockSend.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test Subject');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'This is a test message with enough content to pass validation.');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(mockSend).toHaveBeenCalledTimes(1);
        }, { timeout: 3000 });

        expect(mockSend).toHaveBeenCalledWith(
            'service_test',
            'template_test',
            expect.objectContaining({
                from_name: 'John Doe',
                from_email: 'john@example.com',
                subject: 'Test Subject',
            }),
            'public_test',
        );
    });

    it('shows an inline fallback when EmailJS rejects the submission', async () => {
        mockSend.mockRejectedValue(new Error('Provider unavailable'));

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByLabelText(/subject line/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message');
        await user.click(screen.getByRole('button', { name: /send message/i }));

        expect(await screen.findByRole('alert')).toHaveTextContent(/could not be sent/i);
        expect(screen.getByRole('alert')).toHaveTextContent(/aburahatsabir178@gmail.com/i);
    });

    it('shows success message after submission', async () => {
        mockSend.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message content here');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('disables submit button while submitting', async () => {
        mockSend.mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ status: 200, text: 'OK' }), 500))
        );

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        // Button should be disabled during submission
        expect(submitButton).toBeDisabled();
    });

    it('clears form after successful submission', async () => {
        mockSend.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message');

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
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        // Should not submit with invalid email
        expect(mockSend).not.toHaveBeenCalled();
    });

    it('transitions through state machine correctly', async () => {
        mockSend.mockResolvedValue({ status: 200, text: 'OK' });

        render(<ContactForm />);
        const user = userEvent.setup();

        // Initial state: idle
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();

        await user.type(screen.getByPlaceholderText(/^name$/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com');
        await user.type(screen.getByPlaceholderText(/^what’s this about\?$/i), 'Test');
        await user.type(screen.getByPlaceholderText(/role or support you need/i), 'Test message');

        await user.click(submitButton);

        // State: success
        await waitFor(() => {
            expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});
