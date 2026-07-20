import { describe, it, expect } from "vitest";
import { shouldShowLoader, markLoaderSeen } from "@/lib/loader";

function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
  };
}

describe("loader gating", () => {
  it("shows on a fresh storage", () => {
    expect(shouldShowLoader(makeStorage())).toBe(true);
  });

  it("does not show after being marked seen", () => {
    const s = makeStorage();
    markLoaderSeen(s);
    expect(shouldShowLoader(s)).toBe(false);
  });

  it("defaults to showing if storage throws", () => {
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {},
    };
    expect(shouldShowLoader(broken)).toBe(true);
  });
});
