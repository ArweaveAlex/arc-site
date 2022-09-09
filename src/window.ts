import { STYLING } from "./config";

export function checkDesktop(): boolean {
  return window.innerWidth > parseInt(STYLING.cutoffs.initial);
}

export function hideDocumentBody(): void {
  document.body.style.overflow = "hidden";
}

export function showDocumentBody(): void {
  document.body.style.overflow = "auto";
}

export function checkWindowResize(fn: () => void): void {
  window.addEventListener("resize", fn);
}

export function scrollTo(x: number, y: number) {
  window.scrollTo(x, y);
}