import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
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
    expect(
      screen.queryByPlaceholderText(/enter your email/i),
    ).not.toBeInTheDocument();
  });

  it("uses one page-level h1 on the blog index", () => {
    render(<BlogSeries />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /the journal: ideas, guides, resources, articles and notes/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: /^blog$/i }),
    ).not.toBeInTheDocument();
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

  it("shows a not-found page for an unknown blog slug", () => {
    window.history.pushState({}, "", "/blog/does-not-exist");

    render(<BlogSeries />);

    expect(
      screen.getByRole("heading", { name: /blog post not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(/enter your email/i),
    ).not.toBeInTheDocument();
  });

  it("renders markdown article tables with semantic column and row headers", () => {
    window.history.pushState({}, "", "/blog/how-to-learn-computer-networking");

    render(<BlogSeries />);

    const osiTable = screen.getByRole("table", {
      name: /table with columns: layer, name, what to check/i,
    });

    expect(
      within(osiTable).getByRole("columnheader", { name: "Layer" }),
    ).toHaveAttribute("scope", "col");
    expect(
      within(osiTable).getByRole("rowheader", { name: "7" }),
    ).toHaveAttribute("scope", "row");
  });

  it("renders custom resume article tables with captions and semantic headers", () => {
    window.history.pushState(
      {},
      "",
      "/blog/resume-writing-guide-getting-shortlisted",
    );

    render(<BlogSeries />);

    const workExperienceTable = screen.getByRole("table", {
      name: /work experience resume guidance/i,
    });

    expect(
      within(workExperienceTable).getByRole("columnheader", {
        name: "Role situation",
      }),
    ).toHaveAttribute("scope", "col");
    expect(
      within(workExperienceTable).getByRole("rowheader", {
        name: "Employment gap",
      }),
    ).toHaveAttribute("scope", "row");
  });
});
