
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import AIChatbot from "@/components/assistant/AIChatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calculateur from "./pages/Calculateur";
import Prieres from "./pages/Prieres";
import Nutrition from "./pages/Nutrition";
import Ramadan from "./pages/Ramadan";
import Coran from "./pages/Coran";
import Regime from "./pages/Regime";

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
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/ramadan" element={<Ramadan />} />
            <Route path="/coran" element={<Coran />} />
            <Route path="/regime" element={<Regime />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
