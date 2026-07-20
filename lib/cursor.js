const SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]';

export function isInteractive(el) {
  if (!el || typeof el.closest !== "function") return false;
  return Boolean(el.closest(SELECTOR));
}
