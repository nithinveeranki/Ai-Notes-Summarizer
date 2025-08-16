import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Summarize from "./pages/Summarize";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />

          {/* Clerk built-in auth pages */}
          <Route
            path="/sign-in/*"
            element={
              <SignedOut>
                <div className="flex justify-center items-center h-screen">
                  <SignIn routing="path" path="/sign-in" />
                </div>
              </SignedOut>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <SignedOut>
                <div className="flex justify-center items-center h-screen">
                  <SignUp routing="path" path="/sign-up" />
                </div>
              </SignedOut>
            }
          />

          {/* Protected route: Summarizer */}
          <Route
            path="/summarize"
            element={
              <SignedIn>
                <header className="flex justify-between p-4 border-b">
                  <h1 className="text-xl font-bold">AI Notes Summarizer</h1>
                  <UserButton />
                </header>
                <main className="p-4">
                  <Summarize />
                </main>
              </SignedIn>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
