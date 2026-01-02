import Link from 'next/link'
import { Coffee } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6" />
              <span className="font-bold">Coffee Brew Calculator</span>
            </div>
            <p className="text-amber-200 text-sm">
              Perfect coffee ratios for every brewing method. Free, simple, and accurate.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Calculator</Link></li>
              <li><Link href="/how-to-use/" className="hover:text-white transition-colors">How to Use</Link></li>
              <li><Link href="/blog/" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq/" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about/" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-300">
          <p>&copy; {new Date().getFullYear()} Coffee Brew Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
