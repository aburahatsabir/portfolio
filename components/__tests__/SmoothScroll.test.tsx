import React from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { lenisConstructor } = vi.hoisted(() => ({
  lenisConstructor: vi.fn(),
}));

vi.mock("lenis", () => ({
  default: lenisConstructor,
}));

import SmoothScroll from "../shared/SmoothScroll";

describe("SmoothScroll reduced-motion behavior", () => {
  beforeEach(() => {
    lenisConstructor.mockReset();
    vi.stubGlobal("requestAnimationFrame", vi.fn());
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  it("uses native scrolling and starts no animation loop for reduced motion", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    render(<SmoothScroll><main>Content</main></SmoothScroll>);

    expect(lenisConstructor).not.toHaveBeenCalled();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    expect(window.__lenis).toBeUndefined();
  });
});
