
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2 } from 'lucide-react';
import { AIMessage } from '@/components/nutrition/types';

interface MessageItemProps {
  message: AIMessage;
  index: number;
  isEditing: boolean;
  editText: string;
  onStartEdit: (index: number, content: string) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
  onDelete: (index: number) => void;
  onEditTextChange: (text: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  index,
  isEditing,
  editText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditTextChange
}) => {
  return (
    <div
      className={`${
        message.role === 'user' 
          ? 'bg-islamic-cream self-end ml-8 border-islamic-green/20' 
          : 'bg-white self-start mr-8 border-gray-200'
      } rounded-lg p-3 max-w-[85%] border shadow-sm animate-fade-in group relative`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="w-full p-2 border rounded text-sm resize-none"
            rows={3}
          />
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => onSaveEdit(index)}>
              Sauvegarder
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelEdit}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {message.edited && <span className="ml-1 text-islamic-green">(modifié)</span>}
            </span>
            {message.role === 'user' && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button
                  onClick={() => onStartEdit(index, message.content)}
                  className="p-1 text-gray-400 hover:text-islamic-green"
                  title="Modifier"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Supprimer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageItem;
