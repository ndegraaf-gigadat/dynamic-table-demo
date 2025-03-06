import { writable } from "svelte/store";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};

const toasts = writable<Toast[]>([]);
let toastId = 0;

function addToast(
  message: string,
  type: ToastType = "info",
  duration = 3000
): number {
  const id = toastId++;

  toasts.update((all) => [...all, { id, message, type, duration }]);

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }

  return id;
}

function dismissToast(id: number): void {
  toasts.update((all) => all.filter((t) => t.id !== id));
}

function clearToasts(): void {
  toasts.set([]);
}

const success = (message: string, duration = 3000) =>
  addToast(message, "success", duration);
const error = (message: string, duration = 3000) =>
  addToast(message, "error", duration);
const warning = (message: string, duration = 3000) =>
  addToast(message, "warning", duration);
const info = (message: string, duration = 3000) =>
  addToast(message, "info", duration);

export {
  toasts,
  addToast,
  dismissToast,
  clearToasts,
  success,
  error,
  warning,
  info,
};
