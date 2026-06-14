import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-600">La Mesa</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900">
              How It Works
            </Link>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
            <Link
              href="/apply"
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
