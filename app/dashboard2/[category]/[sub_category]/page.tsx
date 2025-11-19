"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// Mock data: 50 course objects to simulate a large dataset
const MOCK_COURSES = [
  { id: 1, title: "CA", description: "Become a Chartered Accountant and master auditing, taxation, and financial reporting.", tags: ["Accounting", "Finance", "Taxation"], isRecommended: true },
  { id: 2, title: "ACCA", description: "Gain global recognition in accounting and finance with this prestigious qualification.", tags: ["Global Finance", "Accounting", "Business"], isRecommended: false },
  { id: 3, title: "CMA", description: "Specialize in management accounting and strategic financial management.", tags: ["Management", "Cost Accounting", "Strategy"], isRecommended: false },
  { id: 4, title: "CS", description: "Master corporate laws, compliance, and governance for corporate success.", tags: ["Corporate Law", "Governance", "Compliance"], isRecommended: false },
  { id: 5, title: "CFA", description: "Excel in investment analysis and portfolio management with this elite certification.", tags: ["Investment", "Portfolio Management", "Finance"], isRecommended: false },
  { id: 6, title: "MBA Finance", description: "Develop leadership skills while mastering advanced financial concepts and strategies.", tags: ["Business", "Finance", "Leadership"], isRecommended: false },
  { id: 7, title: "B.Com", description: "Build a strong foundation in commerce, accounting, and business fundamentals.", tags: ["Commerce", "Accounting", "Economics"], isRecommended: false },
  { id: 8, title: "M.Com", description: "Advance your commerce knowledge with specialized research and analytical skills.", tags: ["Advanced Commerce", "Research", "Finance"], isRecommended: false },
  { id: 9, title: "CPA", description: "Become a licensed public accountant with expertise in auditing and taxation.", tags: ["Public Accounting", "Taxation", "Auditing"], isRecommended: false },
  { id: 10, title: "FRM", description: "Master financial risk management techniques and analytical tools.", tags: ["Risk Management", "Finance", "Analytics"], isRecommended: false },
  { id: 11, title: "CIA", description: "Lead internal audit functions with globally recognized certification.", tags: ["Internal Audit", "Risk", "Governance"], isRecommended: false },
  { id: 12, title: "CISA", description: "Specialize in IT audit, security, and compliance for digital environments.", tags: ["IT Audit", "Security", "Compliance"], isRecommended: false },
  { id: 13, title: "CFP", description: "Guide clients through comprehensive financial planning and wealth management.", tags: ["Financial Planning", "Wealth Management", "Investment"], isRecommended: false },
  { id: 14, title: "CPA Australia", description: "Gain international accounting credentials recognized across the globe.", tags: ["Accounting", "International", "Business"], isRecommended: false },
  { id: 15, title: "CIMA", description: "Focus on management accounting and business strategy for corporate roles.", tags: ["Management Accounting", "Strategy", "Business"], isRecommended: false },
  { id: 16, title: "Diploma in Taxation", description: "Master tax laws, planning strategies, and compliance requirements.", tags: ["Tax Law", "Compliance", "Planning"], isRecommended: false },
  { id: 17, title: "Diploma in Banking", description: "Learn banking operations, regulations, and financial services management.", tags: ["Banking", "Finance", "Operations"], isRecommended: false },
  { id: 18, title: "Actuarial Science", description: "Apply mathematics and statistics to assess risk in insurance and finance.", tags: ["Mathematics", "Statistics", "Risk"], isRecommended: false },
  { id: 19, title: "Financial Modeling", description: "Build advanced Excel models for valuation, forecasting, and analysis.", tags: ["Excel", "Valuation", "Analysis"], isRecommended: false },
  { id: 20, title: "GST Certification", description: "Master GST compliance, filing, and taxation strategies for businesses.", tags: ["Taxation", "Compliance", "GST"], isRecommended: false },
  { id: 21, title: "Business Analytics", description: "Transform data into insights using analytics and business intelligence tools.", tags: ["Data", "Analytics", "Business Intelligence"], isRecommended: false },
  { id: 22, title: "Investment Banking", description: "Master M&A, capital markets, and corporate finance advisory services.", tags: ["M&A", "Finance", "Capital Markets"], isRecommended: false },
  { id: 23, title: "Corporate Finance", description: "Learn capital structure, valuation, and strategic financial decision-making.", tags: ["Finance", "Valuation", "Strategy"], isRecommended: false },
  { id: 24, title: "Financial Markets", description: "Understand trading, market dynamics, and investment strategies.", tags: ["Trading", "Markets", "Investment"], isRecommended: false },
  { id: 25, title: "Forensic Accounting", description: "Investigate financial fraud and provide litigation support services.", tags: ["Investigation", "Fraud", "Auditing"], isRecommended: false },
  { id: 26, title: "Tax Planning", description: "Develop effective tax strategies for individuals and corporations.", tags: ["Taxation", "Strategy", "Compliance"], isRecommended: false },
  { id: 27, title: "Treasury Management", description: "Manage cash flow, liquidity, and financial risk for organizations.", tags: ["Cash Management", "Finance", "Risk"], isRecommended: false },
  { id: 28, title: "Credit Analysis", description: "Evaluate creditworthiness and manage lending risk effectively.", tags: ["Credit", "Risk", "Finance"], isRecommended: false },
  { id: 29, title: "Wealth Management", description: "Provide comprehensive investment and financial planning advisory services.", tags: ["Investment", "Planning", "Advisory"], isRecommended: false },
  { id: 30, title: "Blockchain Finance", description: "Explore cryptocurrency, blockchain technology, and decentralized finance.", tags: ["Cryptocurrency", "Blockchain", "FinTech"], isRecommended: false },
  { id: 31, title: "ESG Investing", description: "Focus on sustainable and ethical investment strategies for positive impact.", tags: ["Sustainability", "Investment", "Ethics"], isRecommended: false },
  { id: 32, title: "Derivatives Trading", description: "Master options, futures, and advanced trading strategies.", tags: ["Options", "Futures", "Trading"], isRecommended: false },
  { id: 33, title: "Real Estate Finance", description: "Analyze real estate investments, valuation, and property financing.", tags: ["Real Estate", "Investment", "Valuation"], isRecommended: false },
  { id: 34, title: "Private Equity", description: "Learn deal structuring, valuation, and investment strategies in PE.", tags: ["Investment", "M&A", "Valuation"], isRecommended: false },
  { id: 35, title: "Hedge Fund Management", description: "Develop advanced investment strategies and portfolio management skills.", tags: ["Investment", "Strategy", "Portfolio"], isRecommended: false },
  { id: 36, title: "Commodity Trading", description: "Trade commodities and understand global market dynamics.", tags: ["Commodities", "Trading", "Markets"], isRecommended: false },
  { id: 37, title: "Insurance & Risk", description: "Master insurance principles, underwriting, and risk management.", tags: ["Insurance", "Risk Management", "Underwriting"], isRecommended: false },
  { id: 38, title: "Mergers & Acquisitions", description: "Navigate complex M&A transactions and deal structuring.", tags: ["M&A", "Valuation", "Strategy"], isRecommended: false },
  { id: 39, title: "Business Valuation", description: "Value companies using various methodologies and financial analysis.", tags: ["Valuation", "Finance", "Analysis"], isRecommended: false },
  { id: 40, title: "Equity Research", description: "Analyze stocks and provide investment recommendations to clients.", tags: ["Research", "Analysis", "Investment"], isRecommended: false },
  { id: 41, title: "Fixed Income", description: "Understand bond markets, pricing, and fixed income strategies.", tags: ["Bonds", "Fixed Income", "Investment"], isRecommended: false },
  { id: 42, title: "Quantitative Finance", description: "Apply mathematical models to solve complex financial problems.", tags: ["Mathematics", "Modeling", "Finance"], isRecommended: false },
  { id: 43, title: "Microfinance", description: "Provide financial services to underserved communities for social impact.", tags: ["Finance", "Social Impact", "Lending"], isRecommended: false },
  { id: 44, title: "International Finance", description: "Master global finance, foreign exchange, and international markets.", tags: ["Global Finance", "FX", "Markets"], isRecommended: false },
  { id: 45, title: "Behavioral Finance", description: "Understand psychological factors influencing financial decisions.", tags: ["Psychology", "Finance", "Investment"], isRecommended: false },
  { id: 46, title: "FinTech Innovation", description: "Explore digital transformation and innovation in financial services.", tags: ["Technology", "Finance", "Innovation"], isRecommended: false },
  { id: 47, title: "Central Banking", description: "Study monetary policy, banking systems, and economic regulation.", tags: ["Monetary Policy", "Banking", "Economics"], isRecommended: false },
  { id: 48, title: "Islamic Finance", description: "Learn Sharia-compliant banking and investment principles.", tags: ["Islamic Banking", "Sharia", "Finance"], isRecommended: false },
  { id: 49, title: "Project Finance", description: "Finance large infrastructure and capital projects effectively.", tags: ["Projects", "Infrastructure", "Finance"], isRecommended: false },
  { id: 50, title: "Sustainable Finance", description: "Integrate ESG factors into investment and financing decisions.", tags: ["ESG", "Sustainability", "Impact"], isRecommended: false },
];

const ITEMS_PER_PAGE = 10;

export default function ProfessionalCoursesPage() {
  // State management for infinite scroll
  const pathname = usePathname();
  const [visibleCourses, setVisibleCourses] = useState<typeof MOCK_COURSES>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Ref for the loader element (sentinel for Intersection Observer)
  const loaderRef = useRef<HTMLDivElement>(null);

  // Function to load more courses (simulates async data fetching)
  const loadMoreCourses = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Calculate the next batch of courses
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newCourses = MOCK_COURSES.slice(startIndex, endIndex);

    // Check if we've reached the end
    if (newCourses.length === 0 || endIndex >= MOCK_COURSES.length) {
      setHasMore(false);
    }

    // Append new courses to visible courses
    setVisibleCourses((prev) => [...prev, ...newCourses]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  // Intersection Observer setup for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // When the loader element becomes visible, load more courses
        if (target.isIntersecting && !loading && hasMore) {
          loadMoreCourses();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the loader is visible
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, hasMore, page]);

  // Initial load
  useEffect(() => {
    loadMoreCourses();
  }, []);

  // Filter courses based on search query
  const filteredCourses = visibleCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Professional Courses
        </h1>

        {/* Page Controls Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Button */}
          <button className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all">
            Filter by tags
          </button>
        </div>

        {/* Course List Section */}
        <div className="space-y-4">
          {filteredCourses.map((course, index) => {
            // Alternate background colors for visual variety
            const bgColors = [
              "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
              "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
              "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
              "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
              "bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20",
            ];
            const bgColor = bgColors[index % bgColors.length];
            
            return (
              <div
                key={course.id}
                className={`relative ${bgColor} rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all hover:scale-[1.01] overflow-hidden`}
              >
              {/* Recommended Ribbon */}
              {course.isRecommended && (
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-6 -right-8 w-40 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center text-xs font-bold py-1 transform rotate-45 shadow-lg">
                    Recommended
                  </div>
                </div>
              )}

              {/* Course Content */}
              <Link  href = {`${pathname}/${course.title.toLowerCase()}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Course Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {course.title}
                </h2>

                {/* Course Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          );
          })}
        </div>

        {/* Loading Indicator / Sentinel Element */}
        <div ref={loaderRef} className="flex justify-center items-center py-8">
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Loading more courses...
              </span>
            </div>
          )}
          {!loading && !hasMore && visibleCourses.length > 0 && (
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              You've reached the end of the list
            </p>
          )}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No courses found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}