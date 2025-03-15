
import React from 'react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, github } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  content: string;
  type: MessageType;
  index: number;
  direction?: 'rtl' | 'ltr';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, index, direction = 'ltr' }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  
  // Function to parse and format message content with code blocks
  const renderMessageContent = () => {
    // Regular expression to match code blocks with optional language specification
    // Format: ```language\ncode\n```
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    
    let lastIndex = 0;
    const parts = [];
    let match;
    
    // Find all code blocks in the content
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="text-sm sm:text-base leading-relaxed" dir={direction}>
            {content.slice(lastIndex, match.index)}
          </p>
        );
      }
      
      // Add the code block with syntax highlighting
      const language = match[1] || 'javascript'; // Default to javascript if no language specified
      const code = match[2].trim();
      
      parts.push(
        <div key={`code-${match.index}`} className="my-2 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={isDarkTheme ? vscDarkPlus : github}
            customStyle={{
              borderRadius: '0.375rem',
              margin: '0.5rem 0',
            }}
            wrapLines
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text after the last code block
    if (lastIndex < content.length) {
      parts.push(
        <p key={`text-${lastIndex}`} className="text-sm sm:text-base leading-relaxed" dir={direction}>
          {content.slice(lastIndex)}
        </p>
      );
    }
    
    // If no code blocks were found, just return the content as is
    return parts.length > 0 ? parts : (
      <p className="text-sm sm:text-base leading-relaxed" dir={direction}>{content}</p>
    );
  };

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
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default ChatMessage;
