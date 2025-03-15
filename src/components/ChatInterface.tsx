
import React, { useState, useEffect } from 'react';
import Conversation, { Message } from './Conversation';
import ChatInput from './ChatInput';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Check if the message appears to be asking for code
    const askingForCode = /code|snippet|example|javascript|typescript|react|html|css|how to|implement|function/i.test(userMessage);
    
    let response;
    
    if (askingForCode) {
      // Provide a code snippet example
      const codeResponses = [
        `Here's a React component example:\n\n\`\`\`tsx\nimport React, { useState } from 'react';\n\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\n\nconst Button: React.FC<ButtonProps> = ({ label, onClick }) => {\n  const [isHovered, setIsHovered] = useState(false);\n  \n  return (\n    <button\n      className={\`px-4 py-2 rounded \${isHovered ? 'bg-blue-600' : 'bg-blue-500'} text-white\`}\n      onClick={onClick}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n    >\n      {label}\n    </button>\n  );\n};\n\nexport default Button;\n\`\`\``,
        `Here's how you can fetch data with React Query:\n\n\`\`\`tsx\nimport { useQuery } from '@tanstack/react-query';\n\nconst fetchUsers = async () => {\n  const response = await fetch('https://api.example.com/users');\n  if (!response.ok) {\n    throw new Error('Network response was not ok');\n  }\n  return response.json();\n};\n\nconst UserList = () => {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['users'],\n    queryFn: fetchUsers,\n  });\n\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error loading users</div>;\n\n  return (\n    <ul>\n      {data.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n};\n\`\`\``,
        `Here's a CSS animation example:\n\n\`\`\`css\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.animated-element {\n  animation: fadeIn 0.5s ease-out forwards;\n}\n\`\`\``,
      ];
      
      response = codeResponses[Math.floor(Math.random() * codeResponses.length)];
    } else {
      // Use regular responses
      const regularResponses = [
        "I'm an AI assistant designed to help answer your questions and provide information on a wide range of topics.",
        "That's an interesting question. Based on my knowledge, I can provide some insights on this topic.",
        "I'd be happy to help you with that. Here's what I know about the subject.",
        "Thanks for your question. From my understanding, there are several perspectives to consider.",
        "Great question! Let me share some information that might be helpful.",
      ];
      
      response = regularResponses[Math.floor(Math.random() * regularResponses.length)];
    }
    
    setIsTyping(false);
    setMessages(prev => [
      ...prev, 
      {
        content: response,
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
              content: language === 'he' 
                ? "שלום! אני העוזר הבינה המלאכותית שלך. כיצד אוכל לעזור לך היום? אם תרצה דוגמת קוד, פשוט שאל!"
                : "Hello! I'm your AI assistant. How can I help you today? If you need code examples, just ask!",
              type: 'assistant',
              id: Date.now().toString()
            }
          ]);
        }, 1500);
      }
    }, 800);
    
    return () => clearTimeout(welcomeMessage);
  }, [language]);

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
