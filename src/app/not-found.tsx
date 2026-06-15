import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-amber-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/how-it-works"
            className="border border-slate-300 text-slate-700 hover:bg-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            How It Works
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          <span className="font-semibold text-amber-600">La Mesa</span> — ISD Pilot Platform
        </p>
      </div>
    </div>
  )
}
