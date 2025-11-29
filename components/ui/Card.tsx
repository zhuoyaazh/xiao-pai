import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800 ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={`mb-4 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-lg font-bold text-gray-900 dark:text-white ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: CardProps) {
  return <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={`${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardProps) {
  return <div className={`mt-4 flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700 ${className}`} {...props} />;
}

export default Card;
