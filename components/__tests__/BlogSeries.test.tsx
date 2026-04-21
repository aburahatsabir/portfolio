import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogSeries from "../BlogSeries";

describe("BlogSeries subscription form", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/blog");
    window.scrollTo = vi.fn();
  });

  it("shows the subscribed feedback for a valid email", async () => {
    render(<BlogSeries />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/enter your email/i),
      "john@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(
      await screen.findByText("You are now subscribed."),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toHaveValue("");
  });

  it("shows an inline error for an invalid email", async () => {
    render(<BlogSeries />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/enter your email/i),
      "invalid-email",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("You are now subscribed."),
    ).not.toBeInTheDocument();
  });
});
