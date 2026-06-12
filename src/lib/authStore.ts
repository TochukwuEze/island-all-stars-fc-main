"use client";

export const isClient = typeof window !== "undefined";

export function getCurrentUser() {
  if (!isClient) return null;
  const userStr = localStorage.getItem("iasc_current_user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user: any) {
  if (!isClient) return;
  localStorage.setItem("iasc_current_user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
}

export function clearCurrentUser() {
  if (!isClient) return;
  localStorage.removeItem("iasc_current_user");
  window.dispatchEvent(new Event("auth-change"));
}
