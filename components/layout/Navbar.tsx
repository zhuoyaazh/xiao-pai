"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Bell, Menu, Moon, Sun, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-pink-500">
          <span>小派</span>
          <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">XIAO PAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-4 md:flex">
          <Link href="/browse" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
            Browse
          </Link>
          <Link href="/driver-jobs" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
            Driver Jobs
          </Link>
          <Link href="/helper-jobs" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
            Helper Jobs
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <Link href="/notifications">
            <button className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Profile Dropdown (mobile) */}
          <Link href="/profile">
            <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/browse" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
              Browse
            </Link>
            <Link href="/driver-jobs" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
              Driver Jobs
            </Link>
            <Link href="/helper-jobs" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
              Helper Jobs
            </Link>
            <hr className="my-2 dark:border-gray-600" />
            <Link href="/profile" className="text-gray-700 hover:text-pink-500 dark:text-gray-300">
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
