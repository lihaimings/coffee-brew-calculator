import { Coffee, Heart, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">About Us</h1>
        
        <div className="prose prose-amber max-w-none">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-8 h-8 text-amber-600" />
              <h2 className="text-2xl font-bold text-amber-900 m-0">Our Mission</h2>
            </div>
            <p className="text-gray-700">
              Coffee Brew Calculator was created by coffee enthusiasts who believe that everyone 
              deserves a perfect cup of coffee. We built this free tool to help home baristas 
              and coffee lovers achieve consistent, delicious results with every brew.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-amber-600" />
              <h2 className="text-2xl font-bold text-amber-900 m-0">Why We Built This</h2>
            </div>
            <p className="text-gray-700">
              Getting the coffee-to-water ratio right is one of the most important factors in 
              brewing great coffee. Too much coffee and your brew is bitter; too little and 
              it&apos;s weak and watery. Our calculator takes the guesswork out of the equation.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-amber-600" />
              <h2 className="text-2xl font-bold text-amber-900 m-0">Our Promise</h2>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li>✓ Always free to use</li>
              <li>✓ No account required</li>
              <li>✓ No data collection</li>
              <li>✓ Works offline</li>
              <li>✓ Regular updates with new features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
