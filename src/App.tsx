
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SupplierLogin from "./pages/SupplierLogin";
import WalmartLogin from "./pages/WalmartLogin";
import SupplierDashboard from "./pages/SupplierDashboard";
import WalmartDashboard from "./pages/WalmartDashboard";
import SupplierProfile from "./pages/SupplierProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/supplier/login" element={<SupplierLogin />} />
          <Route path="/walmart/login" element={<WalmartLogin />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/walmart/dashboard" element={<WalmartDashboard />} />
          <Route path="/supplier/profile" element={<SupplierProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
