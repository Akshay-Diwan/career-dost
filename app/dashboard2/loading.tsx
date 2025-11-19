export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-t from-purple-300 light:via-purple-50 to-gray-50 dark:from-purple-950 dark:to-gray-900 light:gray-50'>
      {/* Navbar Skeleton */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Dark Mode Toggle Skeleton */}
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-6 w-[80vw] mx-auto sm:w-[40vw]">
          {/* Page Title Skeleton */}
          <div className="text-center md:text-left space-y-3">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4 mx-auto md:mx-0"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/2 mx-auto md:mx-0"></div>
          </div>

          {/* Form Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="space-y-5">
              {/* Name Field Skeleton */}
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
              </div>

              {/* Class Field Skeleton */}
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
              </div>

              {/* City & State Row Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* State Field Skeleton */}
                <div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
                </div>

                {/* City Field Skeleton */}
                <div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Age Field Skeleton */}
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
              </div>

              {/* Submit Button Skeleton */}
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

              {/* Bottom Text Skeleton */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}