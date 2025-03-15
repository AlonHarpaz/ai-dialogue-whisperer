
import React from 'react';
import { cn } from '@/lib/utils';

type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  content: string;
  type: MessageType;
  index: number;
  direction?: 'rtl' | 'ltr';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, index, direction = 'ltr' }) => {
  return (
    <div 
      className="message-container" 
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className={cn(
        type === 'user' ? 'message-user' : 'message-assistant',
        type === 'assistant' && 'glass-effect',
        direction === 'rtl' ? 'rtl' : 'ltr'
      )}>
        <p className="text-sm sm:text-base leading-relaxed" dir={direction}>{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
