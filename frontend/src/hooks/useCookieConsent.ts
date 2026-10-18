import { useState } from "react";

const STORAGE_KEY = "cookie-consent";

const readConsent = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
};

export const useCookieConsent = () => {
  const [accepted, setAccepted] = useState<boolean>(readConsent);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setAccepted(true);
  };

  return { accepted, accept };
};
