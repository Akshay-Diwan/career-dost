const TopCareersSkeleton = () => {
  return (
    <aside className="hidden lg:block lg:w-[30%]">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 sticky top-8 animate-pulse">
        {/* Title skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>

        {/* Subtitle skeleton */}
        <div className="h-3 w-52 bg-gray-300 dark:bg-gray-700 rounded-md mb-6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* List of 5 skeleton items */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {/* Icon circle */}
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>

                {/* Text lines */}
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-600 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                  <div className="h-2 w-1/3 bg-gray-200 dark:bg-gray-600 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                </div>

                {/* Arrow icon skeleton */}
                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
              </div>

              {/* Number badge skeleton */}
              <div className="absolute -left-2 -top-2 w-6 h-6 bg-violet-500/70 rounded-full flex items-center justify-center text-[0] shadow-md">
                {/* just circle shimmer, no text needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TopCareersSkeleton;