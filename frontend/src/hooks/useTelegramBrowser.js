import { useState, useEffect } from 'react';

export function isTelegramBrowser() {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent || '';

  return (
    typeof window.TelegramWebview !== 'undefined' ||
    typeof window.TelegramWebviewProxy !== 'undefined' ||
    /Telegram/i.test(ua)
  );
}

export default function useTelegramBrowser() {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    setIsTelegram(isTelegramBrowser());
    if (isTelegramBrowser()) {
      document.documentElement.classList.add('telegram-browser');
    }
  }, []);

  return isTelegram;
}
