import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
};

export function Button({ className = "", variant = "default", size = "md", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants: Record<string, string> = {
    default: "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export default Button;

