-- Créer table pour les données d'activité physique
CREATE TABLE public.activity_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  steps INTEGER DEFAULT 0,
  calories INTEGER DEFAULT 0,
  distance DECIMAL(5,2) DEFAULT 0.0,
  weekly_steps JSONB DEFAULT '[]'::jsonb,
  is_connected BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Créer table pour les données de régime et poids
CREATE TABLE public.regime_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  poids_initial DECIMAL(5,2),
  poids_actuel DECIMAL(5,2),
  poids_cible DECIMAL(5,2),
  jours_suivis INTEGER DEFAULT 0,
  moyenne_calories INTEGER DEFAULT 0,
  perte_graisse DECIMAL(4,2) DEFAULT 0.0,
  weight_history JSONB DEFAULT '[]'::jsonb,
  calories_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Créer table pour les données de gamification
CREATE TABLE public.gamification_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  badges JSONB DEFAULT '[]'::jsonb,
  challenges JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.activity_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regime_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_data ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour activity_data
CREATE POLICY "Users can view their own activity data" 
ON public.activity_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activity data" 
ON public.activity_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activity data" 
ON public.activity_data 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Politiques RLS pour regime_data
CREATE POLICY "Users can view their own regime data" 
ON public.regime_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own regime data" 
ON public.regime_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own regime data" 
ON public.regime_data 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Politiques RLS pour gamification_data
CREATE POLICY "Users can view their own gamification data" 
ON public.gamification_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gamification data" 
ON public.gamification_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data" 
ON public.gamification_data 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Créer triggers pour mettre à jour updated_at
CREATE TRIGGER update_activity_data_updated_at
BEFORE UPDATE ON public.activity_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_regime_data_updated_at
BEFORE UPDATE ON public.regime_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gamification_data_updated_at
BEFORE UPDATE ON public.gamification_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Activer le temps réel pour toutes les tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.regime_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gamification_data;

-- Configuration REPLICA IDENTITY pour le temps réel
ALTER TABLE public.activity_data REPLICA IDENTITY FULL;
ALTER TABLE public.regime_data REPLICA IDENTITY FULL;
ALTER TABLE public.gamification_data REPLICA IDENTITY FULL;