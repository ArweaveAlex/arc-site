import { STYLING } from "helpers/styling";

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
  setTimeout(function () { window.scrollTo({ left: x, top: y }); }, 1);
}