import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import { ProtectedRoute } from './hooks/useAuth';

import Index from "./pages/Index";
import Subject from "./pages/Subject";
import PYQ from "./pages/PYQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/subjects/:subjectId" element={
                <ProtectedRoute>
                  <Subject />
                </ProtectedRoute>
              } />
              <Route path="/pyq" element={
                <ProtectedRoute>
                  <PYQ />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
