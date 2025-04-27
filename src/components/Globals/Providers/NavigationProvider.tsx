"use client";
// UserContext.js
import React, { createContext, useState, useContext } from "react";

type Maybe<T> = T | null;

// Define the type for the context
type ViewContextT = {
  inView: Maybe<string>;
  setInView: React.Dispatch<React.SetStateAction<Maybe<string>>>;
} | null;

// Create the context
export const ViewContext = createContext<ViewContextT>(null);

// Create a provider component
export function ViewProvider({ children }: { children: React.ReactNode }) {
  // Create state that will be shared
  const [inView, setInView] = useState<Maybe<string>>(null);

  // The value that will be given to the context
  const value: ViewContextT = {
    inView, // The state
    setInView, // The setter function
  };

  // Wrap children with the provider and pass the value
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}

// Custom hook to use this context
export function useInView() {
  const context = useContext<ViewContextT>(ViewContext);

  if (context === undefined || context === null) {
    throw new Error("useInView must be used within a ViewProvider");
  }

  return context;
}
