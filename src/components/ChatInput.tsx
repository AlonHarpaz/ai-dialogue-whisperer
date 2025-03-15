
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

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('sendMessage')}
          className="input-field resize-none min-h-[50px] max-h-[120px] pr-12"
          disabled={isLoading}
          rows={1}
          dir={language === 'he' ? 'rtl' : 'ltr'}
        />
        <button 
          type="submit" 
          className="send-button"
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
