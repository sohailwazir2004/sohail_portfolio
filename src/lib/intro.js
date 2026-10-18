// The intro plays once per browser tab session, so reloading doesn't make people wait again.
export function introWillPlay() {
  try {
    return !sessionStorage.getItem('introSeen');
  } catch {
    return true;
  }
}
