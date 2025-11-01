import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: Visual/Branding Section - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 dark:from-violet-800 dark:via-purple-800 dark:to-indigo-900 relative overflow-hidden">
          {/* Decorative background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
            {/* Branding */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-12 h-12 text-white"
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
                <span className="text-3xl font-bold text-white">CareerDost</span>
              </div>
              <p className="text-white/90 text-lg text-center">
                Your journey to success starts here
              </p>
            </div>

            {/* Main Illustration - Learning/Career themed SVG */}
            <svg
              className="w-full max-w-md"
              viewBox="0 0 400 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Person sitting with laptop */}
              <ellipse cx="200" cy="280" rx="150" ry="20" fill="rgba(255,255,255,0.1)" />
              
              {/* Laptop base */}
              <rect x="140" y="220" width="120" height="8" rx="2" fill="rgba(255,255,255,0.9)" />
              
              {/* Laptop screen */}
              <rect x="145" y="160" width="110" height="65" rx="3" fill="rgba(255,255,255,0.95)" />
              <rect x="150" y="165" width="100" height="55" rx="2" fill="#7C3AED" />
              
              {/* Code lines on screen */}
              <rect x="160" y="175" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.8)" />
              <rect x="160" y="185" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="160" y="195" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
              <rect x="160" y="205" width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
              
              {/* Person's head */}
              <circle cx="200" cy="140" r="25" fill="rgba(255,255,255,0.9)" />
              
              {/* Person's body */}
              <path d="M200 165 L200 220 M200 180 L170 200 M200 180 L230 200" 
                    stroke="rgba(255,255,255,0.9)" strokeWidth="8" strokeLinecap="round"/>
              
              {/* Floating elements - Books */}
              <g opacity="0.8">
                <rect x="80" y="100" width="30" height="40" rx="2" fill="rgba(255,255,255,0.9)" transform="rotate(-15 95 120)"/>
                <rect x="85" y="105" width="20" height="30" rx="1" fill="#A78BFA" transform="rotate(-15 95 120)"/>
              </g>
              
              <g opacity="0.8">
                <rect x="290" y="130" width="35" height="45" rx="2" fill="rgba(255,255,255,0.9)" transform="rotate(12 307.5 152.5)"/>
                <rect x="295" y="135" width="25" height="35" rx="1" fill="#C4B5FD" transform="rotate(12 307.5 152.5)"/>
              </g>
              
              {/* Floating icons - Graduation cap */}
              <g transform="translate(100, 50)">
                <path d="M20 10 L0 0 L20 10 L40 0 L20 10 Z" fill="rgba(255,255,255,0.85)"/>
                <rect x="18" y="10" width="4" height="15" fill="rgba(255,255,255,0.85)"/>
                <circle cx="20" cy="27" r="3" fill="rgba(255,255,255,0.85)"/>
              </g>
              
              {/* Floating icons - Light bulb (idea) */}
              <g transform="translate(280, 80)">
                <circle cx="20" cy="15" r="12" fill="rgba(255,255,255,0.85)"/>
                <rect x="18" y="27" width="4" height="6" rx="1" fill="rgba(255,255,255,0.85)"/>
                <path d="M14 30 L26 30" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round"/>
              </g>
              
              {/* Decorative stars/sparkles */}
              <g opacity="0.7">
                <path d="M60 180 L62 185 L67 187 L62 189 L60 194 L58 189 L53 187 L58 185 Z" fill="rgba(255,255,255,0.9)"/>
                <path d="M320 200 L322 205 L327 207 L322 209 L320 214 L318 209 L313 207 L318 205 Z" fill="rgba(255,255,255,0.9)"/>
                <path d="M150 60 L151 63 L154 64 L151 65 L150 68 L149 65 L146 64 L149 63 Z" fill="rgba(255,255,255,0.9)"/>
                <path d="M330 120 L331 123 L334 124 L331 125 L330 128 L329 125 L326 124 L329 123 Z" fill="rgba(255,255,255,0.9)"/>
              </g>
            </svg>

            {/* Feature highlights */}
            <div className="mt-12 space-y-4 text-white/90">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized career guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Expert course recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Track your learning progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Section - Visible on all screen sizes */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md">
            {/* Mobile-only header */}
            <div className="md:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg
                  className="w-10 h-10 text-violet-600 dark:text-violet-400"
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
                <span className="text-2xl font-bold text-gray-900 dark:text-white">EduPath</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Clerk SignIn Component with Custom Styling */}
            <SignIn
              appearance={{
                theme: dark,
                elements:{formButtonPrimary: {
                    backgroundColor: '#7C3AED', // violet-600
                    color: '#ffffff',
                    // borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    padding: '0.625rem 1rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#6D28D9', // violet-700
                    },
                    '&:active': {
                      backgroundColor: '#5B21B6', // violet-800
                    },
                  },
              }
              }
            }
              // Show alternative sign in methods
              routing="path"
              path="/sign-in"
              fallbackRedirectUrl={'/dashboard2'}
              signUpFallbackRedirectUrl={'/onboarding'}
            />

            {/* Additional help text */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}