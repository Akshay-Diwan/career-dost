export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header Skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-72 mb-8 animate-pulse"></div>

        {/* Page Controls Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar Skeleton */}
          <div className="relative">
            <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>

          {/* Filter Button Skeleton */}
          <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Course List Section - Initial Batch */}
        <div className="space-y-4">
          {/* Course Card Skeleton 1 - Purple/Pink */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              
              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 2 - Blue/Indigo */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 3 - Green/Emerald */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-32 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 4 - Orange/Amber */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-32 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 5 - Cyan/Teal */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-44 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 6 - Purple/Pink */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-32 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 7 - Blue/Indigo */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Course Card Skeleton 8 - Green/Emerald */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Loading courses...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}