
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

export type Message = {
  content: string;
  type: 'user' | 'assistant';
  id: string;
};

interface ConversationProps {
  messages: Message[];
  isTyping: boolean;
}

const Conversation: React.FC<ConversationProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 px-2 sm:px-4">
      <div className={`pb-4 space-y-6 ${language === 'he' ? 'text-right' : 'text-left'}`}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center min-h-[50vh]">
            <div className="text-center max-w-md animate-fade-in">
              <h2 className="text-2xl font-medium mb-2">{t('welcome')}</h2>
              <p className="text-muted-foreground mb-2">
                {t('askAnything')}
              </p>
              <p className="text-primary text-sm">
                {t('askForCode')}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
              index={index}
              direction={language === 'he' ? 'rtl' : 'ltr'}
            />
          ))
        )}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default Conversation;
