import { describe, it, expect } from "vitest";
import { isInteractive } from "@/lib/cursor";

describe("isInteractive", () => {
  it("returns false for null", () => {
    expect(isInteractive(null)).toBe(false);
  });

  it("returns true for a button element", () => {
    const btn = document.createElement("button");
    expect(isInteractive(btn)).toBe(true);
  });

  it("returns true for a child of an anchor", () => {
    const a = document.createElement("a");
    const span = document.createElement("span");
    a.appendChild(span);
    expect(isInteractive(span)).toBe(true);
  });

  it("returns false for a plain div", () => {
    const div = document.createElement("div");
    expect(isInteractive(div)).toBe(false);
  });

  it("returns true for an element flagged data-cursor='interactive'", () => {
    const div = document.createElement("div");
    div.setAttribute("data-cursor", "interactive");
    expect(isInteractive(div)).toBe(true);
  });
});
