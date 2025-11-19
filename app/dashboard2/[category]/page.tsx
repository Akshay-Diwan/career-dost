'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';



// Commerce Detail Page Component
export default function CommercePage() {
  // Dark mode state - checks system preference on mount
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
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

  // Course categories data
  const courseCategories = [
    {
      id: 1,
      title: 'Degree Courses',
      description: 'Bachelor of Commerce (B.Com), Bachelor of Business Administration (BBA), and more comprehensive degree programs.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-900/20',
      borderLight: 'border-blue-200',
      borderDark: 'dark:border-blue-800',
      recommended: false
    },
    {
      id: 2,
      title: 'Professional Courses',
      description: 'CA (Chartered Accountancy), CMA (Cost and Management Accountant), CS (Company Secretary), and other professional certifications.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-violet-500 to-purple-500',
      bgLight: 'bg-violet-50',
      bgDark: 'dark:bg-violet-900/20',
      borderLight: 'border-violet-200',
      borderDark: 'dark:border-violet-800',
      recommended: true
    },
    {
      id: 3,
      title: 'Diploma',
      description: 'Diploma in Business Administration, Accounting, Marketing, and other specialized short-term diploma programs.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-900/20',
      borderLight: 'border-emerald-200',
      borderDark: 'dark:border-emerald-800',
      recommended: false
    },
    {
      id: 4,
      title: 'Hotel Management',
      description: 'Bachelor of Hotel Management (BHM), Diploma in Hotel Management, and hospitality industry courses.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-900/20',
      borderLight: 'border-amber-200',
      borderDark: 'dark:border-amber-800',
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Commerce
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore various commerce courses and certifications to advance your career in business, finance, and management.
          </p>
        </div>
{/* Additional Info Section */}
        <div className="mb-12 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl p-8 border border-violet-200 dark:border-violet-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Not sure which commerce path is right for you? Take our personalized quiz to get course recommendations based on your interests and career goals.
              </p>
            </div>
            <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
              Take Career Quiz
            </button>
          </div>
        </div>
        {/* Course Category Cards Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courseCategories.map((category) => (
            <div key={category.id} className="relative group">
              {/* Recommended Ribbon - Positioned absolutely at top-right corner with diagonal rotation */}
              {category.recommended && (
                <div className="absolute -right-2 -top-2 z-10">
                  <div className="relative">
                    {/* Ribbon background with rotation */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-1 shadow-lg transform rotate-12 origin-center">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Recommended
                      </span>
                    </div>
                    {/* Small decorative triangles at ribbon ends for depth */}
                    <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-amber-700 transform -rotate-12"></div>
                    <div className="absolute -bottom-1 right-0 w-0 h-0 border-r-8 border-r-transparent border-t-8 border-t-orange-700 transform rotate-12"></div>
                  </div>
                </div>
              )}

              {/* Course Card */}
              <button
                className={`w-full h-full text-left p-6 rounded-2xl border-2 transition-all duration-300 
                  ${category.bgLight} ${category.bgDark} 
                  ${category.borderLight} ${category.borderDark}
                  hover:shadow-xl hover:scale-105 hover:border-violet-400 dark:hover:border-violet-500
                  focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700
                `}
                onClick = {()=> router.push('/dashboard2/commerce/professional')}
              >
                {/* Icon Container */}
                <div className="mb-4">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                    {category.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Arrow Icon - Appears on hover */}
                <div className="mt-6 flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-sm">Explore Courses</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}