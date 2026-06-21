import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

const STORAGE_KEY = "sf-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ru" ? "ru" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === "en" ? "ru" : "en"));
  };

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.title = translations[locale].meta.title;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    toggleLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
