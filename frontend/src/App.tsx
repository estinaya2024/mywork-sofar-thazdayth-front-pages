/**
 * COMPOSANT PRINCIPAL DE L'APPLICATION
 * Ce fichier gère tout le routage de mon site.
 * J'ai créé ces pages une par une pour m'assurer que tout fonctionne parfaitement.
 * Pour cette version, j'ai activé uniquement les pages d'information ; le backend et la boutique seront intégrés plus tard.
 */

import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import Processus from "./pages/Processus";
import Plats from "./pages/Plats";
import Region from "./pages/Region";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AnimatePresence mode="wait">
          {loading && <LoadingScreen onComplete={handleComplete} />}
        </AnimatePresence>
        {!loading && (
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/processus" element={<Processus />} />
              <Route path="/plats" element={<Plats />} />
              <Route path="/region" element={<Region />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
