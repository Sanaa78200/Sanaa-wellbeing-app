
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calculator } from 'lucide-react';

interface CalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinNeed: number;
  waterNeed: number;
  ramadanCalories?: number;
}

const CalorieCalculator = () => {
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activityLevel, setActivityLevel] = useState("sedentaire");
  const [goal, setGoal] = useState("perte_moderee");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationMode, setCalculationMode] = useState("normal");

  // Handle input changes
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setAge(value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setWeight(value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setHeight(value);
  };

  // Calculate BMR using Harris-Benedict formula for women
  const calculateBMR = (weight: number, height: number, age: number): number => {
    // Harris-Benedict formula for women
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (bmr: number, activityLevel: string): number => {
    const activityFactors: {[key: string]: number} = {
      'sedentaire': 1.2,
      'legere': 1.375,
      'moderee': 1.55,
      'intense': 1.725,
      'tres_intense': 1.9
    };
    
    return bmr * activityFactors[activityLevel];
  };

  // Calculate target calories based on goal
  const calculateTargetCalories = (tdee: number, goal: string): number => {
    const goalFactors: {[key: string]: number} = {
      'perte_legere': 0.9, // 10% deficit
      'perte_moderee': 0.8, // 20% deficit
      'perte_rapide': 0.75, // 25% deficit
      'maintien': 1, // maintenance
      'prise_masse': 1.1 // 10% surplus
    };
    
    return tdee * goalFactors[goal];
  };

  // Calculate Ramadan-adjusted calories
  const calculateRamadanCalories = (baseCalories: number, activityLevel: string): number => {
    const reductionFactors: {[key: string]: number} = {
      'sedentaire': 0.85,
      'legere': 0.8,
      'moderee': 0.75,
      'intense': 0.7,
      'tres_intense': 0.7
    };
    
    return baseCalories * reductionFactors[activityLevel];
  };

  // Handle calculation
  const handleCalculate = () => {
    if (typeof age === 'number' && typeof weight === 'number' && typeof height === 'number') {
      const bmr = calculateBMR(weight, height, age);
      const tdee = calculateTDEE(bmr, activityLevel);
      const targetCalories = calculateTargetCalories(tdee, goal);
      
      // Calculate protein need (1.2g per kg for women trying to lose weight)
      const proteinNeed = weight * 1.2;
      
      // Calculate water need (30ml per kg)
      const waterNeed = weight * 30;
      
      // Calculate Ramadan-adjusted calories if in Ramadan mode
      const ramadanCalories = calculateRamadanCalories(targetCalories, activityLevel);
      
      setResult({
        bmr,
        tdee,
        targetCalories,
        proteinNeed,
        waterNeed,
        ramadanCalories: calculationMode === "ramadan" ? ramadanCalories : undefined
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="islamic-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-islamic-green" />
            <CardTitle className="text-islamic-green-dark">Calculateur de calories</CardTitle>
          </div>
          <CardDescription>
            Calculez vos besoins caloriques quotidiens basés sur les principes islamiques de modération et de santé.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="normal" onValueChange={(value) => setCalculationMode(value)}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="normal">Mode normal</TabsTrigger>
              <TabsTrigger value="ramadan">Mode Ramadan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="normal">
              <p className="text-islamic-slate mb-4">
                Ce calculateur prend en compte votre profil personnel pour déterminer vos besoins caloriques quotidiens.
              </p>
            </TabsContent>
            
            <TabsContent value="ramadan">
              <p className="text-islamic-slate mb-4">
                Le mode Ramadan ajuste les calculs en tenant compte des périodes de jeûne et des horaires de repas spécifiques.
              </p>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Âge</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Âge en années"
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Poids en kg"
                  value={weight}
                  onChange={handleWeightChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Taille (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Taille en cm"
                value={height}
                onChange={handleHeightChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activity">Niveau d'activité</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentaire">Sédentaire (peu ou pas d'exercice)</SelectItem>
                  <SelectItem value="legere">Activité légère (1-3 jours/semaine)</SelectItem>
                  <SelectItem value="moderee">Activité modérée (3-5 jours/semaine)</SelectItem>
                  <SelectItem value="intense">Activité intense (6-7 jours/semaine)</SelectItem>
                  <SelectItem value="tres_intense">Activité très intense (2x par jour)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Objectif</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Sélectionnez votre objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perte_legere">Perte de poids légère (0.25 kg/semaine)</SelectItem>
                  <SelectItem value="perte_moderee">Perte de poids modérée (0.5 kg/semaine)</SelectItem>
                  <SelectItem value="perte_rapide">Perte de poids plus rapide (0.75 kg/semaine)</SelectItem>
                  <SelectItem value="maintien">Maintien du poids</SelectItem>
                  <SelectItem value="prise_masse">Prise de masse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full bg-islamic-green hover:bg-islamic-green-dark"
              onClick={handleCalculate}
              disabled={age === "" || weight === "" || height === ""}
            >
              Calculer
            </Button>
          </div>
          
          {result && (
            <div className="mt-6 pt-6 border-t border-islamic-green/10">
              <h3 className="font-semibold text-islamic-green-dark mb-4">Vos résultats personnalisés</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-islamic-slate text-sm">Métabolisme de base (BMR)</p>
                  <p className="text-islamic-green-dark font-semibold">{Math.round(result.bmr)} calories</p>
                </div>
                <div className="space-y-2">
                  <p className="text-islamic-slate text-sm">Dépense énergétique totale (TDEE)</p>
                  <p className="text-islamic-green-dark font-semibold">{Math.round(result.tdee)} calories</p>
                </div>
                
                <Separator className="col-span-2 my-2" />
                
                <div className="space-y-2 col-span-2">
                  <p className="text-islamic-slate text-sm">
                    {calculationMode === "ramadan" ? "Objectif calorique pendant le Ramadan" : "Objectif calorique quotidien"}
                  </p>
                  <p className="text-islamic-green font-bold text-xl">
                    {Math.round(calculationMode === "ramadan" ? result.ramadanCalories! : result.targetCalories)} calories
                  </p>
                </div>
                
                <Separator className="col-span-2 my-2" />
                
                <div className="space-y-2">
                  <p className="text-islamic-slate text-sm">Besoins en protéines</p>
                  <p className="text-islamic-green-dark font-semibold">{Math.round(result.proteinNeed)} g/jour</p>
                </div>
                <div className="space-y-2">
                  <p className="text-islamic-slate text-sm">Besoins en eau</p>
                  <p className="text-islamic-green-dark font-semibold">{Math.round(result.waterNeed / 1000)} L/jour</p>
                </div>
              </div>
              
              {calculationMode === "ramadan" && (
                <div className="mt-4 p-3 bg-islamic-cream rounded-md border border-islamic-green/20">
                  <p className="text-islamic-slate text-sm">
                    <span className="font-medium text-islamic-green-dark">Conseil pour le Ramadan:</span> Répartissez vos calories entre le Suhoor (30%) et l'Iftar (70%). Assurez-vous de consommer suffisamment d'eau entre le Maghrib et le Fajr.
                  </p>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-islamic-cream rounded-md border border-islamic-green/20">
                <p className="text-islamic-slate text-sm italic">
                  "Le fils d'Adam ne remplit pas un récipient pire que son ventre. Quelques bouchées suffisent au fils d'Adam pour se tenir droit. S'il doit absolument (remplir son estomac), alors qu'il consacre un tiers pour sa nourriture, un tiers pour sa boisson et un tiers pour sa respiration."
                  <span className="block mt-1 text-islamic-green text-xs">— Rapporté par at-Tirmidhi (2380)</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieCalculator;
