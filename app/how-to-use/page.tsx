import { Coffee, Scale, Clock, Save, Droplets } from 'lucide-react'

export default function HowToUsePage() {
  const steps = [
    {
      icon: Coffee,
      title: '1. Choose Your Brewing Method',
      description: 'Select from Pour Over, French Press, Espresso, Cold Brew, or AeroPress. Each method has its own optimal ratio.',
    },
    {
      icon: Scale,
      title: '2. Set Your Coffee Amount',
      description: 'Use the slider to set how much coffee you want to use. The calculator will automatically adjust the water amount.',
    },
    {
      icon: Droplets,
      title: '3. Adjust Strength',
      description: 'Choose Light, Medium, or Strong to fine-tune the ratio to your taste preference.',
    },
    {
      icon: Clock,
      title: '4. Use the Timer',
      description: 'Start the built-in timer to track your brew time. You\'ll get a notification when it\'s done.',
    },
    {
      icon: Save,
      title: '5. Save Your Favorites',
      description: 'Save your perfect recipes to quickly load them later. All data is stored locally on your device.',
    },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">How to Use</h1>
        <p className="text-lg text-amber-700 text-center mb-12">
          Follow these simple steps to brew the perfect cup of coffee.
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Pro Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li>☕ Use freshly roasted coffee beans for the best flavor</li>
            <li>☕ Grind your coffee just before brewing</li>
            <li>☕ Use filtered water at 195-205°F (90-96°C)</li>
            <li>☕ Pre-wet your filter to remove paper taste</li>
            <li>☕ Experiment with ratios to find your perfect cup</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
