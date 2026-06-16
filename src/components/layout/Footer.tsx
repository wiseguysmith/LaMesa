import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-warm-muted py-12 border-t-4 border-terracotta">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-xl font-bold text-terracotta">La Mesa</span>
            <p className="mt-2 text-sm max-w-xs leading-relaxed">
              An ISD-powered pilot platform for team formation and prototype development.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-cream mb-2">Platform</p>
              <ul className="space-y-1">
                <li><Link href="/how-it-works" className="hover:text-cream transition-colors">How It Works</Link></li>
                <li><Link href="/apply" className="hover:text-cream transition-colors">Apply as Founder</Link></li>
                <li><Link href="/join" className="hover:text-cream transition-colors">Join as Builder</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-cream mb-2">Account</p>
              <ul className="space-y-1">
                <li><Link href="/login" className="hover:text-cream transition-colors">Sign In</Link></li>
                <li><Link href="/login?mode=signup" className="hover:text-cream transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#3D2010] text-xs">
          <p>© 2026 La Mesa. Powered by ISD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
