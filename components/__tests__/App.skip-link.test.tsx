import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

vi.mock("../../components/Navbar", () => ({
  default: () => <div>Navbar</div>,
}));

vi.mock("../../components/Hero", () => ({
  default: () => <div>Hero</div>,
}));

vi.mock("../../components/Footer", () => ({
  default: () => <div>Footer</div>,
}));

vi.mock("../../components/About", () => ({
  default: () => <div>About</div>,
}));

vi.mock("../../components/Work", () => ({
  default: () => <div>Work</div>,
}));

vi.mock("../../components/Contact", () => ({
  default: () => <div>Contact</div>,
}));

vi.mock("../../components/ScrollToTop", () => ({
  default: () => null,
}));

vi.mock("../../components/BottomCTA", () => ({
  default: () => <div>Bottom CTA</div>,
}));

vi.mock("../../components/CookieConsent", () => ({
  default: () => null,
}));

vi.mock("../../components/OfflineIndicator", () => ({
  default: () => null,
}));

vi.mock("../../components/ErrorBoundary", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../../components/shared/SmoothScroll", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../../utils/seo-utils", () => ({
  updatePageMetadata: vi.fn(),
  generateWebSiteSchema: vi.fn(() => ({})),
  generateFAQSchema: vi.fn(() => ({})),
  generateBreadcrumbSchema: vi.fn(() => ({})),
  injectSchema: vi.fn(),
  removeSchema: vi.fn(),
}));

vi.mock("../../utils/analytics", () => ({
  trackPageView: vi.fn(),
  trackNavigation: vi.fn(),
  trackError: vi.fn(),
}));

vi.mock("../../hooks/useScrollDepth", () => ({
  useScrollDepth: vi.fn(),
}));

vi.mock("../../hooks/useEngagementTime", () => ({
  useEngagementTime: vi.fn(),
}));

vi.mock("../../hooks/useExitIntent", () => ({
  useExitIntent: vi.fn(),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

import App from "../../App";

describe("App skip link landmark wiring", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/work/hr-docs");
    window.scrollTo = vi.fn();
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  it("renders a removed work-detail route as not found inside the global main landmark", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /skip to main content/i }),
    ).toHaveAttribute("href", "#main-content");

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();

    const main = document.querySelector("main#main-content");
    expect(main).not.toBeNull();
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(document.getElementById("main")).toBeNull();
    expect(main).toContainElement(screen.getByRole("heading", { name: /page not found/i }));
  });

  it("renders a not-found page instead of the homepage for unknown routes", () => {
    window.history.pushState({}, "", "/does-not-exist");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Hero")).not.toBeInTheDocument();
  });

  it("updates the rendered route when browser history emits popstate", () => {
    render(<App />);

    act(() => {
      window.history.pushState({}, "", "/about");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByText("About")).toBeInTheDocument();

    act(() => {
      window.history.pushState({}, "", "/retired-page");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });

  it("moves keyboard focus to the main landmark from the skip link", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: /skip to main content/i }));

    expect(document.querySelector("main#main-content")).toHaveFocus();
  });

  it("provides one route-level H1 for About, Work, and Contact", () => {
    window.history.pushState({}, "", "/about");
    render(<App />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/about abu rahat sabir/i);

    act(() => {
      window.history.pushState({}, "", "/work");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/work portfolio/i);

    act(() => {
      window.history.pushState({}, "", "/contact");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/contact abu rahat sabir/i);
  });
});
