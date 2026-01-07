'use client';

// src/components/ui/alert.tsx
import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children?: React.ReactNode;
}

export const Alert = ({ variant = 'default', className = '', children }: AlertProps) => {
  const baseStyles = "relative w-full rounded-lg border p-4";
  const variantStyles = {
    default: "bg-white bg-opacity-10 text-white",
    destructive: "bg-red-100 border-red-500 text-red-700"
  };

  return (
    <div role="alert" className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);