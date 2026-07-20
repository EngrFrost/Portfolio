const KEY = "ijs_loader_seen";

export function shouldShowLoader(storage) {
  try {
    return storage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

export function markLoaderSeen(storage) {
  try {
    storage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}
