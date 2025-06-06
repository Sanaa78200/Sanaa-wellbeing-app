
import React from 'react';
import { Loader2, MessageCircle } from 'lucide-react';
import { AIMessage } from '@/components/nutrition/types';
import MessageBubble from './MessageBubble';

interface MessagesListProps {
  messages: AIMessage[];
  isLoading: boolean;
  userName?: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onDeleteMessage: (index: number) => void;
  onEditMessage: (index: number, newContent: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  isLoading,
  userName,
  messagesEndRef,
  onDeleteMessage,
  onEditMessage
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-islamic-pattern bg-opacity-5">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-600 p-6 bg-white/90 rounded-lg shadow-sm max-w-sm">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-40 text-islamic-green" />
            <p className="font-medium text-lg mb-2">
              السلام عليكم {userName || ''}!
            </p>
            <p className="text-sm opacity-75">
              Posez vos questions sur la nutrition halal et le bien-être selon l'Islam.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              index={index}
              onDelete={onDeleteMessage}
              onEdit={onEditMessage}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-4 border shadow-sm max-w-xs">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin text-islamic-green" />
                  <span className="text-sm text-islamic-green font-medium">
                    L'assistant réfléchit...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
