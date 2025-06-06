
import React from 'react';
import { AIMessage } from '@/components/nutrition/types';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  messages: AIMessage[];
  message: string;
  isLoading: boolean;
  isMobile: boolean;
  userName?: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onClose: () => void;
  onReset: () => void;
  onDeleteMessage: (index: number) => void;
  onEditMessage: (index: number, newContent: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  isLoading,
  isMobile,
  userName,
  messagesEndRef,
  onMessageChange,
  onSendMessage,
  onClose,
  onReset,
  onDeleteMessage,
  onEditMessage
}) => {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        userName={userName}
        isMobile={isMobile}
        onClose={onClose}
        onReset={onReset}
      />
      
      <MessagesList
        messages={messages}
        isLoading={isLoading}
        userName={userName}
        messagesEndRef={messagesEndRef}
        onDeleteMessage={onDeleteMessage}
        onEditMessage={onEditMessage}
      />
      
      <ChatInput
        message={message}
        isLoading={isLoading}
        isMobile={isMobile}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
