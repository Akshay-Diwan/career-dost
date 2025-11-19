"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, MutableRefObject } from "react";

export default function LandingPage() {
  const {theme, setTheme} = useTheme();

  // Apply dark mode class to document
  const toggleDarkMode = ()=> setTheme((theme) => theme === 'dark' ? 'light':'dark' );

const section2 = useRef<HTMLElement | null>(null);
const section3 = useRef<HTMLElement | null>(null);
const scrollToSection = (sectionRef: MutableRefObject<HTMLElement | null>) => {
  const section = sectionRef.current;
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 sticky top-0 z-50 transition-colors">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            CareerBoost
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Sign In Button */}
            <Link href="/sign-in" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-md">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Section */}
      {/* Two-column grid on desktop (md:grid-cols-2), stacks on mobile */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-br from-violet-100 to-gray-50 dark:from-violet-950  dark:to-gray-900 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div  className="space-y-6 translate-y-8 opacity-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Feeling stuck on your career path?
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Meet <span className="text-purple-600 dark:text-purple-400 font-semibold">CareerBoost</span>: Your friendly AI guide to a future you'll love.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/sign-in" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg">
                Find Your Calling (It's Free!)
              </Link>
              <button onClick={()=> scrollToSection(section2)} className="px-8 py-4 text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                See how it works →
              </button>
            </div>
          </div>

          {/* Right Column - Hero Illustration */}
          <div className="flex justify-center opacity-0 translate-y-8 animate-fade-in">
              <Image src = "/thinking.png" alt="thinking image" width={400} height={400}/>
          </div>
        </div>
      </section>

      {/* Section 2: Features Section */}
      {/* Three-column grid on desktop (md:grid-cols-3), single column on mobile */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24 transition-colors" ref={section2}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How CareerBoost Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature Card 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all hover:scale-105">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" className="fill-purple-100 dark:fill-purple-900/30" />
                  <path d="M 30 45 Q 50 60 70 45" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <circle cx="38" cy="38" r="4" className="fill-purple-600 dark:fill-purple-400" />
                  <circle cx="62" cy="38" r="4" className="fill-purple-600 dark:fill-purple-400" />
                  <path d="M 25 25 Q 20 35 25 40" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M 75 25 Q 80 35 75 40" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Your Personal Career Coach
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Chat with our AI. It listens to your passions and helps you discover paths you never even considered.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all hover:scale-105">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" className="fill-green-100 dark:fill-green-900/30" />
                  <path d="M 30 50 L 45 65 L 70 35" className="stroke-green-600 dark:stroke-green-400" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="50" cy="50" r="35" className="stroke-green-600 dark:stroke-green-400" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Discover Your Strengths
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Take fun, insightful quizzes designed to match your unique personality and skills to your perfect career.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all hover:scale-105">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" className="fill-blue-100 dark:fill-blue-900/30" />
                  <circle cx="35" cy="40" r="12" className="fill-blue-600 dark:fill-blue-400" />
                  <circle cx="65" cy="40" r="12" className="fill-blue-600 dark:fill-blue-400" />
                  <circle cx="50" cy="65" r="12" className="fill-blue-600 dark:fill-blue-400" />
                  <line x1="35" y1="40" x2="50" y2="65" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="3" />
                  <line x1="65" y1="40" x2="50" y2="65" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="3" />
                  <line x1="35" y1="40" x2="65" y2="40" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Connect with Peers
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Join vibrant communities of students and professionals. Ask questions, share experiences, and grow together.
              </p>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="flex justify-center">
            <button onClick={()=> scrollToSection(section3)} className="px-8 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all transform hover:scale-105">
              Hear from the community
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Testimonials & Final CTA */}
      <section className="py-16 md:py-24" ref={section3}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Real Stories, Real Success
          </h2>

          {/* Testimonials Grid - Three columns on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <div className="mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "CareerBoost didn't just show me a job; it showed me a direction."
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                — Alex J., former 'Undecided'
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "The personality quiz was eye-opening! I finally understand what makes me tick."
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                — Priya M., Data Analyst
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <div className="mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "The community support is incredible. I found a mentor who changed my life!"
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                — Rahul S., Marketing Intern
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to find your focus?
            </h2>
            <Link href="/sign-in" className="px-10 py-5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-xl text-xl">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 CareerBoost. Your journey, our passion.</p>
        </div>
      </footer>
    </div>
  );
}