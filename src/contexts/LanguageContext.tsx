
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome to the AI Assistant",
    askAnything: "Ask anything and get a detailed, helpful response.",
    sendMessage: "Send a message...",
    online: "Online",
    askForCode: "Try asking for code examples!",
  },
  he: {
    welcome: "ברוכים הבאים לעוזר הבינה המלאכותית",
    askAnything: "שאל כל שאלה וקבל תשובה מפורטת ומועילה.",
    sendMessage: "שלח הודעה...",
    online: "מחובר",
    askForCode: "נסה לבקש דוגמאות קוד!",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
