import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Coffee Brew Calculator',
    excerpt: 'Learn how to use our calculator to brew the perfect cup of coffee every time.',
    date: '2026-01-02',
    readTime: '3 min read',
  },
  {
    slug: 'perfect-pour-over',
    title: 'The Art of Perfect Pour Over Coffee',
    excerpt: 'Master the pour over technique with our comprehensive guide and ratio recommendations.',
    date: '2026-01-01',
    readTime: '5 min read',
  },
  {
    slug: 'french-press-guide',
    title: 'French Press: A Complete Guide',
    excerpt: 'Everything you need to know about brewing rich, full-bodied coffee with a French Press.',
    date: '2025-12-30',
    readTime: '4 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">Blog</h1>
        <p className="text-lg text-amber-700 text-center mb-12">
          Tips, guides, and insights for coffee lovers.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-amber-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
