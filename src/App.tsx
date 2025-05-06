
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import AIChatbot from "@/components/assistant/AIChatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calculateur from "./pages/Calculateur";
import Prieres from "./pages/Prieres";
import NutritionRegime from "./pages/NutritionRegime";
import Ramadan from "./pages/Ramadan";
import Coran from "./pages/Coran";
import Profil from "./pages/Profil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculateur" element={<Calculateur />} />
            <Route path="/prieres" element={<Prieres />} />
            <Route path="/nutrition-regime" element={<NutritionRegime />} />
            {/* Redirects for old routes */}
            <Route path="/nutrition" element={<Navigate to="/nutrition-regime" replace />} />
            <Route path="/regime" element={<Navigate to="/nutrition-regime" replace />} />
            <Route path="/ramadan" element={<Ramadan />} />
            <Route path="/coran" element={<Coran />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
