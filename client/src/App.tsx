import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router base={base}><Switch><Route path="/" component={Home} />
      <Route path="/gravity-control-2026" component={AdminDashboard} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Router></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
