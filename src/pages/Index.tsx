
import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DarkModeToggle from '@/components/DarkModeToggle';
import { ThemeProvider } from 'next-themes';

const Index: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <header className="border-b border-border">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
              <h1 className="text-xl font-medium">AI Whisperer</h1>
              <div className="flex items-center space-x-3">
                <LanguageSwitcher />
                <DarkModeToggle />
                <div className="flex space-x-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-sm text-muted-foreground" id="online-status">Online</span>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-hidden">
            <ChatInterface />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
