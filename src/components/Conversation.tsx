
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-messages px-2 sm:px-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md animate-fade-in">
            <h2 className="text-2xl font-medium mb-2">Welcome to the AI Assistant</h2>
            <p className="text-muted-foreground">
              Ask anything and get a detailed, helpful response.
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
          />
        ))
      )}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Conversation;
