'use client';

import { UserSchema } from '@/libs/schema';
import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {Autocomplete, AutocompleteItem} from "@heroui/react";
import { createContentSecurityPolicyHeaders } from '@clerk/nextjs/dist/types/server/content-security-policy';
interface Location{
  name: string,
  id: number
}

// Profile Form Page Component
export default function ProfilePage() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  // User state
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter();
  console.log(user);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  // Fetch all states
  useEffect(() => {
    fetch('/api/v1/locations/states')
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  // Fetch cities for the selected state
  useEffect(() => {
    if (!selectedState) return;
    fetch(`/api/v1/locations/${selectedState}`)
      .then(res => res.json())
      .then(data => setCities(data));
  }, [selectedState]);

  const {register, handleSubmit, formState : {errors}, setValue } =
   useForm<z.infer<typeof UserSchema>>(
    {resolver: zodResolver(UserSchema),
defaultValues: {
  email: ""
}
})
  // Handle form submit
  const onSubmit = async (data: z.infer<typeof UserSchema>)=> {
  console.log("onSubmit called");
  console.log("Form data:", data);
  console.log("User email:", user?.primaryEmailAddress?.emailAddress);
  if(!selectedState || !selectedCity) return;
  try {
    console.log(" Starting fetch...");
    
    const payload = {
      ...data, 
      email: user?.primaryEmailAddress?.emailAddress,
      state_id: states.findLast((state) => state.name === selectedState)?.id ?? -1,
      city_id: cities.findLast((city) => city.name === selectedCity)?.id ?? -1
    };
    console.log("Payload being sent:", payload);
    
    const response = await fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    // const response = await fetch('/api/v1/users', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to submit: ${response.status}`);
    }
    console.log("response: ");
    console.log(response.body);
    const result = await response.json();
    console.log("Success result:", result);
    
    router.push('/dashboard');
  } catch (err) {
    console.error("Catch block error:", err);
  }
};

  // // Initialize dark mode
  // useEffect(() => {
  //   // const savedTheme = localStorage.getItem('theme');
  //   // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
  //   // if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  //   //   setIsDarkMode(true);
  //   //   document.documentElement.classList.add('dark');
  //   // } else {
  //   //   setIsDarkMode(false);
  //   //   document.documentElement.classList.remove('dark');
  //   // }
  // }, []);

  // Toggle dark mode
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
  //   if(!isLoaded) {
  //   return (<div>Loading...</div>)
  // }
  // console.log("errors : " + errors)
  // console.log("email errors : " + errors.email?.message)
  // console.log("name errors : " + errors.name?.message)
  // console.log("age errors : " + errors.age?.message)
  // console.log("class errors : " + errors.class?.message)
  // console.log("error keys" + Object.values(errors))



 

  return (
    // <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 transition-colors duration-300">
    <div className='min-h-screen bg-gradient-to-t from-purple-300 light:via-purple-50 to-gray-50 dark:from-purple-950 dark:to-gray-900 light:gray-50'>
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
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

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* RIGHT COLUMN (Desktop) / BOTTOM (Mobile): Title + Form */}
          <div className="space-y-6 w-[80vw] mx-auto sm:w-[40vw]">
            {/* Page Title */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Tell us more about you
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Help us personalize your learning journey! 🚀
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <div className="space-y-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
              
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    What's your name? ✨
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                  />
                

                {/* Class Field */}
                <div className='my-3'>
                  <label htmlFor="class" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    What class are you in? 📚
                  </label>
                  <input
                    type="text"
                    id="class"
                    {...register("class")}
                    placeholder="e.g., 12th Grade, College Freshman"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                  />
                </div>

                {/* City & State Row (Side by side on larger screens) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* State Field */}
                  {/* <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      State 🗺️
                    </label>
                    <input
                      type="number"
                      id="state"
                      {...register("state_id")}
                      placeholder="Your state"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                    />
                  </div> */}

                  {/* City Field */}
                  {/* <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      City 🌆
                    </label>
                    <input
                      type="number"
                      id="city"
                      {...register("city_id")}
                      placeholder="Your city"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                    />
                  </div> */}
                        {/* State Autocomplete */}
      <Autocomplete
        variant='bordered'
        label="Select State"
        placeholder="Search state..."
        onSelectionChange={(key) => {
          setSelectedState(key);
          setSelectedCity(undefined);
          console.log(selectedState);
        }}
        selectedKey={selectedState}
      >
        {states.map((state) => (
          <AutocompleteItem key={state.name} value={state.id}>
            {state.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      {/* City Autocomplete */}
      <Autocomplete
      variant='bordered'
        label="Select City"
        placeholder={
          selectedState ? "Search city..." : "Select state first"
        }
        onSelectionChange={(key) => setSelectedCity(key)}
        selectedKey={selectedCity}
        isDisabled={!selectedState}
      >
        {cities.map((city) => (
          <AutocompleteItem key = {city.name} value={city.id}>
            {city.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
                </div>

                {/* Age Field */}
                <div className='my-2.5'>
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    How old are you? 🎂
                  </label>
                  <input
                    type="number"
                    id="age"
                    {...register("age",{valueAsNumber: true})}
                    placeholder="Your age"
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Interest Field */}
                {/* <div>
                  <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    What interests you most? 💡
                  </label>
                  <input
                    type="text"
                    id="interest"
                    
                    placeholder="e.g., Science, Arts, Technology, Business"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-200 outline-none"
                  />
                </div> */}

                {/* Submit Button */}
   
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
                >
                  Continue Your Journey 🎯
                </button>
                </form>

                {/* Optional: Progress indicator or encouraging text */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Just one more step to unlock personalized recommendations! 🌟
                </p>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}