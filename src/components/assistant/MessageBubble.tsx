
import React, { useState } from 'react';
import { Edit3, Trash2, Check, X } from 'lucide-react';
import { AIMessage } from '@/components/nutrition/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageBubbleProps {
  message: AIMessage;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newContent: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  index,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);

  const handleSaveEdit = () => {
    onEdit(index, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(message.content);
    setIsEditing(false);
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`group relative max-w-[80%] rounded-lg p-4 shadow-sm ${
          isUser
            ? 'bg-islamic-cream border-islamic-green/20 border'
            : 'bg-white border-gray-200 border'
        }`}
      >
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none"
              rows={3}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Check className="w-4 h-4 mr-1" />
                Sauvegarder
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="w-4 h-4 mr-1" />
                Annuler
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {message.edited && (
                  <span className="ml-1 text-islamic-green">(modifié)</span>
                )}
              </span>
              
              {isUser && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-islamic-green transition-colors"
                    title="Modifier"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
