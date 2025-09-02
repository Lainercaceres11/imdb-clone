"use client";

import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="className='text-gray-700 dark:text-gray-200 dark:bg-gray-700 min-h-screen select-none transition-colors duration-300'">
        {children}
      </div>
    </ThemeProvider>
  );
};
