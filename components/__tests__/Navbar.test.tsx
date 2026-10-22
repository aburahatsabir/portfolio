import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("framer-motion", () => {
  const Motion = ({
    children,
    initial: _initial,
    animate: _animate,
    exit: _exit,
    transition: _transition,
    ...props
  }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => (
    <div {...props}>{children}</div>
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: Motion,
      span: Motion,
      a: Motion,
    },
  };
});

vi.mock("../../components/shared/SocialLinks", () => ({
  default: () => <div>Social links</div>,
}));

vi.mock("../../utils/analytics", () => ({
  trackResumeDownload: vi.fn(),
}));

import Navbar from "../../components/Navbar";

describe("Navbar mobile dialog", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  it("moves focus into the dialog, traps it, and restores the trigger on Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const trigger = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", "mobile-menu");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

    const dialog = screen.getByRole("dialog", { name: /navigation menu/i });
    const closeButton = within(dialog).getByRole("button", { name: /close navigation menu/i });
    await waitFor(() => expect(closeButton).toHaveFocus());

    const lastButton = within(dialog).getByRole("button", { name: /download resume/i });
    lastButton.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports backdrop dismissal and repeated open-close cycles", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const trigger = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(trigger);
    let dialog = screen.getByRole("dialog", { name: /navigation menu/i });
    fireEvent.pointerDown(dialog.parentElement as HTMLElement);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    dialog = screen.getByRole("dialog", { name: /navigation menu/i });
    await user.click(within(dialog).getByRole("button", { name: /close navigation menu/i }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
