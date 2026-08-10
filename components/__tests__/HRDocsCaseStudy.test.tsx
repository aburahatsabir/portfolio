import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HRDocsCaseStudy from "../HRDocsCaseStudy";

describe("HRDocsCaseStudy CMS tabs", () => {
  it("exposes a unique accessible name for each tab button", () => {
    render(<HRDocsCaseStudy />);

    expect(
      screen.getByRole("button", { name: "Select Why this system" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Select Connected Modules" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Select Controls First" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Select API-Level Access" }),
    ).toBeInTheDocument();
  });
});
