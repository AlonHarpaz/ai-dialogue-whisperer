
import React, { useState, useEffect } from 'react';
import Conversation, { Message } from './Conversation';
import ChatInput from './ChatInput';
import { useToast } from '@/components/ui/use-toast';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "I'm an AI assistant designed to help answer your questions and provide information on a wide range of topics.",
      "That's an interesting question. Based on my knowledge, I can provide some insights on this topic.",
      "I'd be happy to help you with that. Here's what I know about the subject.",
      "Thanks for your question. From my understanding, there are several perspectives to consider.",
      "Great question! Let me share some information that might be helpful.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setIsTyping(false);
    setMessages(prev => [
      ...prev, 
      {
        content: randomResponse,
        type: 'assistant',
        id: Date.now().toString()
      }
    ]);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const newMessage: Message = {
      content,
      type: 'user',
      id: Date.now().toString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    generateResponse(content);
  };

  useEffect(() => {
    const welcomeMessage = setTimeout(() => {
      if (messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              content: "Hello! I'm your AI assistant. How can I help you today?",
              type: 'assistant',
              id: Date.now().toString()
            }
          ]);
        }, 1500);
      }
    }, 800);
    
    return () => clearTimeout(welcomeMessage);
  }, []);

  return (
    <div className="chat-container">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <Conversation messages={messages} isTyping={isTyping} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;
