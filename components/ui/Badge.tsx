import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "green" | "red" | "yellow" | "blue" | "gray";
};

const variantClasses = {
  green: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  red: "bg-red-100 text-red-800 border border-red-300",
  yellow: "bg-amber-100 text-amber-800 border border-amber-300",
  blue: "bg-blue-100 text-blue-800 border border-blue-300",
  gray: "bg-gray-100 text-gray-800 border border-gray-300",
};

export function Badge({ className = "", variant = "gray", ...props }: BadgeProps) {
  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`} {...props} />
  );
}

export default Badge;
