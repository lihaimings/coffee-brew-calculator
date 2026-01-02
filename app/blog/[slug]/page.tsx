import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const blogContent: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  'getting-started': {
    title: 'Getting Started with Coffee Brew Calculator',
    date: '2026-01-02',
    readTime: '3 min read',
    content: `
      <p>Welcome to Coffee Brew Calculator! This guide will help you get started with brewing the perfect cup of coffee.</p>
      
      <h2>Step 1: Choose Your Brewing Method</h2>
      <p>We support five popular brewing methods: Pour Over, French Press, Espresso, Cold Brew, and AeroPress. Each method has its own optimal coffee-to-water ratio.</p>
      
      <h2>Step 2: Set Your Coffee Amount</h2>
      <p>Use the slider to set how much coffee you want to use. A good starting point is 15-20 grams for a single cup.</p>
      
      <h2>Step 3: Adjust to Your Taste</h2>
      <p>Use the strength selector to fine-tune the ratio. Light gives you a milder cup, while Strong produces a more intense flavor.</p>
      
      <h2>Step 4: Use the Timer</h2>
      <p>Our built-in timer is pre-set for each brewing method. Start it when you begin brewing and you'll get a notification when it's time to stop.</p>
      
      <h2>Step 5: Save Your Favorites</h2>
      <p>Found your perfect ratio? Save it as a recipe so you can quickly load it next time!</p>
    `,
  },
  'perfect-pour-over': {
    title: 'The Art of Perfect Pour Over Coffee',
    date: '2026-01-01',
    readTime: '5 min read',
    content: `
      <p>Pour over coffee is beloved for its clean, bright flavors and the control it gives you over the brewing process.</p>
      
      <h2>The Golden Ratio</h2>
      <p>For pour over, we recommend starting with a 1:16 ratio (1 gram of coffee to 16 grams of water). This produces a balanced cup that highlights the coffee's natural flavors.</p>
      
      <h2>Water Temperature</h2>
      <p>Use water between 195-205°F (90-96°C). If you don't have a thermometer, bring water to a boil and let it rest for 30 seconds.</p>
      
      <h2>The Bloom</h2>
      <p>Start by pouring just enough water to saturate the grounds (about twice the weight of coffee). Wait 30-45 seconds for the coffee to "bloom" and release CO2.</p>
      
      <h2>Pouring Technique</h2>
      <p>Pour in slow, concentric circles from the center outward. Avoid pouring directly on the filter. Total brew time should be 2-4 minutes.</p>
      
      <h2>Grind Size</h2>
      <p>Use a medium-fine grind, similar to table salt. Too fine and your coffee will be bitter; too coarse and it will be weak.</p>
    `,
  },
  'french-press-guide': {
    title: 'French Press: A Complete Guide',
    date: '2025-12-30',
    readTime: '4 min read',
    content: `
      <p>The French Press is one of the simplest and most forgiving brewing methods, producing a rich, full-bodied cup of coffee.</p>
      
      <h2>The Ratio</h2>
      <p>We recommend a 1:15 ratio for French Press. This slightly stronger ratio compensates for the immersion brewing method.</p>
      
      <h2>Grind Size</h2>
      <p>Use a coarse grind, similar to sea salt. Fine grounds will slip through the filter and make your coffee muddy.</p>
      
      <h2>Brewing Steps</h2>
      <ol>
        <li>Add coarse ground coffee to the press</li>
        <li>Pour hot water (195-205°F) over the grounds</li>
        <li>Stir gently to ensure all grounds are wet</li>
        <li>Place the lid on (don't press yet) and wait 4 minutes</li>
        <li>Press the plunger down slowly and steadily</li>
        <li>Pour immediately to prevent over-extraction</li>
      </ol>
      
      <h2>Pro Tips</h2>
      <p>Preheat your French Press with hot water before brewing. This helps maintain temperature during the steep. Also, don't let the coffee sit in the press after brewing – pour it all out or transfer to a carafe.</p>
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug]

  if (!post) {
    return (
      <div className="py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link href="/blog/" className="text-amber-600 hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <div
            className="prose prose-amber max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
