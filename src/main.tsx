import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey}>
    <App />
  </ClerkProvider>
);
