import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-400 ${className}`}
      {...props}
    />
  );
}

export default Input;

