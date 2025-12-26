"use client";

import { NextIntlClientProvider } from "next-intl";

interface LocaleProviderProps {
  children: React.ReactNode;
  messages: Record<string, string>;
}

export default function LocaleProvider({ children, messages }: LocaleProviderProps) {
  if (!messages) {
    console.error("LocaleProvider: 'messages' es requerido y no se proporcionó.");
    throw new Error("LocaleProvider: 'messages' es obligatorio.");
  }

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}