// @ts-check
import { initAuth, mountAuthNav } from "./auth.js";

initAuth();
for (const slot of document.querySelectorAll("[data-auth-nav]")) {
  if (slot instanceof HTMLElement) {
    mountAuthNav(slot);
  }
}
