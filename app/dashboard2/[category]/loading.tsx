export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Additional Info Section Skeleton */}
        <div className="mb-12 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl p-8 border border-violet-200 dark:border-violet-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Course Category Cards Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 - Blue Theme */}
          <div className="relative group bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6">
            {/* Icon Container Skeleton */}
            <div className="mb-4">
              <div className="inline-flex p-4 rounded-xl w-20 h-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>

            {/* Card Content Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>

            {/* Arrow Section Skeleton */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Card 2 - Violet Theme with Ribbon */}
          <div className="relative group bg-violet-50 dark:bg-violet-900/20 rounded-2xl border-2 border-violet-200 dark:border-violet-800 p-6">
            {/* Recommended Ribbon Skeleton */}
            <div className="absolute -right-2 -top-2 z-10">
              <div className="relative">
                <div className="bg-gray-200 dark:bg-gray-700 px-8 py-1 shadow-lg transform rotate-12 origin-center animate-pulse">
                  <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Icon Container Skeleton */}
            <div className="mb-4">
              <div className="inline-flex p-4 rounded-xl w-20 h-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>

            {/* Card Content Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              </div>
            </div>

            {/* Arrow Section Skeleton */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Card 3 - Emerald Theme */}
          <div className="relative group bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 p-6">
            {/* Icon Container Skeleton */}
            <div className="mb-4">
              <div className="inline-flex p-4 rounded-xl w-20 h-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>

            {/* Card Content Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>

            {/* Arrow Section Skeleton */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Card 4 - Amber Theme */}
          <div className="relative group bg-amber-50 dark:bg-amber-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800 p-6">
            {/* Icon Container Skeleton */}
            <div className="mb-4">
              <div className="inline-flex p-4 rounded-xl w-20 h-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>

            {/* Card Content Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-52 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>

            {/* Arrow Section Skeleton */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}   