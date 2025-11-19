'use client'
import { useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    let {user, isLoaded} = useUser();
    const {theme, setTheme} = useTheme();
    const toggleDarkMode = ()=> setTheme((theme) => theme == 'dark' ? 'light':'dark' );
    const pathname = usePathname()
    const [isDarkMode, setIsDarkMode] = useState(theme);
    if(!isLoaded) {
        return <div>Loading...</div>
    }
  return (
    <div>
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
                CollegeDost
              </span>
              <div className='ml-4 flex gap-4'>
                <Link href='/dashboard2' className={!pathname.startsWith('dashboard2/community') ? "font-extrabold" : "font-normal"}>Explore</Link>
                <Link href='/dashboard2/community' className={pathname.startsWith('dashboard2/community') ? "font-extrabold" : "font-normal"}>Community</Link>
                <Link href='/dashboard2/testimonials' className={pathname.startsWith('dashboard2/testimonials') ? "font-extrabold" : "font-normal"}>Testimonials</Link>

            </div>
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
                  Welcome, <span className="font-semibold text-violet-600 dark:text-violet-400">{user?.fullName || user?.username}</span>
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  <img src = {user?.imageUrl} className='rounded-full'/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

export default layout
