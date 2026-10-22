import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

import CookieConsent from "../CookieConsent";

describe("CookieConsent", () => {
  const gtag = vi.fn();
  const loadGoogleAnalytics = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.useFakeTimers();
    window.gtag = gtag;
    window.loadGoogleAnalytics = loadGoogleAnalytics;
    gtag.mockClear();
    loadGoogleAnalytics.mockClear();
  });

  it("does not load analytics before consent and loads it after acceptance", () => {
    render(<CookieConsent />);

    expect(loadGoogleAnalytics).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1000));

    const dialog = screen.getByRole("dialog", { name: /analytics cookie preferences/i });
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(dialog).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-consent")).toBe("accepted");
    expect(gtag).toHaveBeenCalledWith("consent", "update", expect.objectContaining({
      analytics_storage: "granted",
      ad_storage: "denied",
    }));
    expect(loadGoogleAnalytics).toHaveBeenCalledTimes(1);
  });

  it("reopens preferences and clears analytics state when consent is withdrawn", () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("analytics_event_queue", "[{}]");
    sessionStorage.setItem("analytics_blocked_logged", "true");
    render(<CookieConsent />);

    expect(loadGoogleAnalytics).toHaveBeenCalledTimes(1);
    act(() => window.dispatchEvent(new Event("open-cookie-settings")));
    fireEvent.click(screen.getByRole("button", { name: "Reject" }));

    expect(localStorage.getItem("cookie-consent")).toBe("declined");
    expect(localStorage.getItem("analytics_event_queue")).toBeNull();
    expect(sessionStorage.getItem("analytics_blocked_logged")).toBeNull();
    expect(gtag).toHaveBeenLastCalledWith("consent", "update", expect.objectContaining({
      analytics_storage: "denied",
    }));
  });
});
