import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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

vi.mock("../../components/ScrollToTop", () => ({
  default: () => null,
}));

vi.mock("../../components/PersonaCTA", () => ({
  default: () => <div>Persona CTA</div>,
}));

vi.mock("../../components/PersonaBanner", () => ({
  default: () => <div>Persona Banner</div>,
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

vi.mock("../../components/HRDocsCaseStudy", () => ({
  default: () => <div>Mock HR Docs Case Study</div>,
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
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  it("renders the HR docs route inside the global main-content landmark", async () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /skip to main content/i }),
    ).toHaveAttribute("href", "#main-content");

    expect(await screen.findByText("Mock HR Docs Case Study")).toBeInTheDocument();

    const main = document.querySelector("main#main-content");
    expect(main).not.toBeNull();
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(document.getElementById("main")).toBeNull();
    expect(main).toContainElement(screen.getByText("Mock HR Docs Case Study"));
  });

  it("renders a not-found page instead of the homepage for unknown routes", () => {
    window.history.pushState({}, "", "/does-not-exist");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Hero")).not.toBeInTheDocument();
  });
});
