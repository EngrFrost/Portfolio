import { describe, it, expect, beforeEach, vi } from "vitest";
import { StrictMode } from "react";
import { render, screen, act } from "@testing-library/react";
import Loader from "@/components/motion/Loader";

describe("Loader", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("renders the intro under StrictMode and only marks seen after the timer", () => {
    vi.useFakeTimers();
    try {
      render(
        <StrictMode>
          <Loader />
        </StrictMode>
      );
      // Visible on first paint...
      expect(screen.getByText("IAN")).toBeInTheDocument();
      // ...and not marked seen until the timer fires.
      expect(window.sessionStorage.getItem("ijs_loader_seen")).toBeNull();
      act(() => {
        vi.advanceTimersByTime(1800);
      });
      expect(window.sessionStorage.getItem("ijs_loader_seen")).toBe("1");
    } finally {
      vi.useRealTimers();
    }
  });
});
