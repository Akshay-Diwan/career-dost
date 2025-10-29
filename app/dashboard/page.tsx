'use client';

import React, { useState, useEffect } from 'react';

// Main Dashboard Page Component
export default function DashboardPage() {
  // Dark mode state - checks system preference on mount
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg
                className="w-8 h-8 text-violet-600 dark:text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CareerDost
              </span>
            </div>

            {/* Right side: Dark Mode Toggle + Welcome Message */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  // Sun Icon (for light mode)
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  // Moon Icon (for dark mode)
                  <svg
                    className="w-5 h-5 text-violet-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              {/* Welcome Message */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Welcome, <span className="font-semibold text-violet-600 dark:text-violet-400">User!</span>
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz CTA Banner */}
        <div className="mb-8 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg overflow-hidden border border-violet-200 dark:border-violet-800">
          <div className="grid md:grid-cols-2 gap-6 items-center p-6 md:p-8">
            {/* Text Content */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Confused which to explore?
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                Take our quiz and we can recommend the perfect path for you based on your interests and strengths.
              </p>
              <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
                Take Quiz Now
              </button>
            </div>

            {/* Illustration - Hidden on mobile */}
            <div className="hidden md:flex justify-center items-center">
              <svg
                className="w-64 h-64"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Thinking student illustration */}
                <circle cx="100" cy="60" r="30" className="fill-violet-300 dark:fill-violet-700" />
                <path
                  d="M70 90 Q100 110 130 90"
                  className="stroke-violet-400 dark:stroke-violet-600"
                  strokeWidth="3"
                  fill="none"
                />
                <ellipse cx="100" cy="120" rx="40" ry="50" className="fill-violet-200 dark:fill-violet-800" />
                
                {/* Question marks */}
                <text x="40" y="40" className="fill-purple-500 dark:fill-purple-400 text-2xl font-bold">?</text>
                <text x="150" y="50" className="fill-purple-500 dark:fill-purple-400 text-3xl font-bold">?</text>
                <text x="160" y="120" className="fill-purple-500 dark:fill-purple-400 text-xl font-bold">?</text>
                
                {/* Thought bubble */}
                <circle cx="130" cy="35" r="8" className="fill-violet-300 dark:fill-violet-600" opacity="0.6" />
                <circle cx="140" cy="25" r="12" className="fill-violet-300 dark:fill-violet-600" opacity="0.7" />
                <circle cx="155" cy="20" r="18" className="fill-violet-300 dark:fill-violet-600" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subject Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Science Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group hover:scale-105">
            <div className="p-6 space-y-4">
              {/* Science Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-16 h-16 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Science
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore physics, chemistry, and biology. Discover the wonders of the natural world through experimentation and analysis.
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 px-4 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-semibold rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors duration-200">
                Explore Science
              </button>
            </div>
          </div>

          {/* Arts Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group hover:scale-105">
            <div className="p-6 space-y-4">
              {/* Arts Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-16 h-16 text-pink-600 dark:text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Arts
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Unleash your creativity with design, music, and history. Express yourself through various forms of artistic expression.
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 px-4 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-semibold rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors duration-200">
                Explore Arts
              </button>
            </div>
          </div>

          {/* Commerce Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group hover:scale-105">
            <div className="p-6 space-y-4">
              {/* Commerce Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-16 h-16 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Commerce
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Master business, economics, and finance. Build the skills needed for a successful career in the corporate world.
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 px-4 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-semibold rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors duration-200">
                Explore Commerce
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}