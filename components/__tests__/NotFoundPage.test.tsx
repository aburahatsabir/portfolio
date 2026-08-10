import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "../NotFoundPage";

describe("NotFoundPage", () => {
  it("sets noindex metadata while mounted", () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("noindex,follow");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: /go back home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("removes 404 noindex metadata when unmounted", () => {
    const robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex,follow");
    document.head.appendChild(robots);

    const { unmount } = render(<NotFoundPage />);
    unmount();

    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });
});
