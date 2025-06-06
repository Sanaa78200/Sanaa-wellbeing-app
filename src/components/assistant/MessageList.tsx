
import React from 'react';
import { Loader2, MessageCircle } from 'lucide-react';
import { AIMessage } from '@/components/nutrition/types';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: AIMessage[];
  isLoading: boolean;
  isMobileOptimized: boolean;
  showSuggestions: boolean;
  userName?: string;
  suggestedQuestions: string[];
  editingMessageId: number | null;
  editText: string;
  onSelectSuggestion: (question: string) => void;
  onStartEdit: (index: number, content: string) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
  onDeleteMessage: (index: number) => void;
  onEditTextChange: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  isMobileOptimized,
  showSuggestions,
  userName,
  suggestedQuestions,
  editingMessageId,
  editText,
  onSelectSuggestion,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteMessage,
  onEditTextChange,
  messagesEndRef
}) => {
  return (
    <div className={`${isMobileOptimized ? 'h-full' : 'h-96'} overflow-y-auto p-4 flex flex-col gap-3 bg-islamic-pattern bg-opacity-5`}>
      {messages.length === 0 ? (
        <div className="text-center text-gray-600 my-auto p-4 bg-white/90 rounded-lg shadow-sm">
          <MessageCircle className="w-16 h-16 mx-auto mb-3 opacity-40 text-islamic-green" />
          <p className="mb-4 font-medium">السلام عليكم {userName || ''} ! Posez vos questions sur la nutrition halal et le bien-être selon l'Islam.</p>
          
          {showSuggestions && (
            <div className="space-y-2 mt-4">
              <p className="font-semibold text-islamic-green text-sm mb-3">Questions suggérées :</p>
              {suggestedQuestions.map((q, i) => (
                <div 
                  key={i} 
                  className="text-left text-sm p-3 bg-islamic-cream rounded-lg cursor-pointer hover:bg-islamic-cream/80 transition-colors border border-islamic-green/10"
                  onClick={() => onSelectSuggestion(q)}
                >
                  {q}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageItem
            key={index}
            message={msg}
            index={index}
            isEditing={editingMessageId === index}
            editText={editText}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDeleteMessage}
            onEditTextChange={onEditTextChange}
          />
        ))
      )}
      {isLoading && (
        <div className="bg-white self-start rounded-lg p-4 mr-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-islamic-green" />
            <span className="text-sm text-islamic-green font-medium">L'assistant réfléchit...</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
