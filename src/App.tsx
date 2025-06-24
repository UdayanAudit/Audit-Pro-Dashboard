import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaxAudit from "./pages/TaxAudit";
import SalaryReconciliation from "./pages/SalaryReconciliation";
import ProfessionalTax from "./pages/ProfessionalTax";
import OpeningBalance from "./pages/OpeningBalance";
import BankVouching from "./pages/BankVouching";
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
          <Route path="/tax-audit" element={<TaxAudit />} />
          <Route
            path="/salary-reconciliation"
            element={<SalaryReconciliation />}
          />
          <Route path="/professional-tax" element={<ProfessionalTax />} />
          <Route path="/opening-balance" element={<OpeningBalance />} />
          <Route path="/bank-vouching" element={<BankVouching />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
