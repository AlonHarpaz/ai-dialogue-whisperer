
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="message-container" style={{ '--index': 0 } as React.CSSProperties}>
      <div className="typing-indicator">
        <div className="typing-dot" style={{ '--dot-index': 0 } as React.CSSProperties}></div>
        <div className="typing-dot" style={{ '--dot-index': 1 } as React.CSSProperties}></div>
        <div className="typing-dot" style={{ '--dot-index': 2 } as React.CSSProperties}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
