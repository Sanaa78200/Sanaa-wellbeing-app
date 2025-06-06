
import { useState, useEffect } from 'react';

const suggestedQuestions = [
  "Quels aliments halal pour perdre du poids ?",
  "Comment bien s'alimenter pendant le Ramadan ?",
  "Quelles sont les meilleures protéines halal ?",
  "Comment créer un menu équilibré selon la Sunna ?",
  "Quels aliments donnent de l'énergie selon l'Islam ?"
];

export const useSuggestedQuestions = (messageCount: number) => {
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (messageCount > 2) {
      setShowSuggestions(false);
    }
  }, [messageCount]);

  return {
    suggestedQuestions,
    showSuggestions
  };
};
