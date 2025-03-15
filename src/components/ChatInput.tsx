
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [message]);

  useEffect(() => {
    // Update online status text
    const onlineStatus = document.getElementById('online-status');
    if (onlineStatus) {
      onlineStatus.textContent = t('online');
    }
  }, [language, t]);

  const isRtl = language === 'he';

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('sendMessage')}
          className={`input-field resize-none min-h-[50px] max-h-[120px] ${isRtl ? 'pl-12 pr-4' : 'pr-12 pl-4'}`}
          disabled={isLoading}
          rows={1}
          dir={isRtl ? 'rtl' : 'ltr'}
        />
        <button 
          type="submit" 
          className={`absolute top-[calc(1rem+3px)] p-2 rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isRtl ? 'left-3 right-auto' : 'right-3 left-auto'
          }`}
          disabled={!message.trim() || isLoading}
          aria-label="Send message"
        >
          <ArrowUp size={18} className="text-primary-foreground" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
