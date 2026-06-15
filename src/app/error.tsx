'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong</h1>
        <p className="text-slate-500 mb-8">
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-slate-300 text-slate-700 hover:bg-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Back to Home
          </a>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          <span className="font-semibold text-amber-600">La Mesa</span> — ISD Pilot Platform
        </p>
      </div>
    </div>
  )
}
