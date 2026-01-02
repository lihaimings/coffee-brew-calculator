'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What is the ideal coffee-to-water ratio?',
    answer: 'The ideal ratio depends on your brewing method and taste preference. A common starting point is 1:16 (1 gram of coffee to 16 grams of water) for pour over. French Press typically uses 1:15, while espresso uses about 1:2.',
  },
  {
    question: 'Why does the ratio change for different brewing methods?',
    answer: 'Different brewing methods extract coffee differently. Immersion methods like French Press need a slightly stronger ratio because the grounds are in contact with water longer. Espresso uses a very concentrated ratio because of the high pressure extraction.',
  },
  {
    question: 'How do I measure coffee without a scale?',
    answer: 'While a scale is recommended for accuracy, you can use tablespoons as a rough guide. One tablespoon of ground coffee is approximately 5-7 grams. However, for consistent results, we recommend using a digital scale.',
  },
  {
    question: 'What water temperature should I use?',
    answer: 'For most brewing methods, water between 195-205°F (90-96°C) is ideal. Water that\'s too hot can over-extract and make coffee bitter, while water that\'s too cool will under-extract and taste weak.',
  },
  {
    question: 'How long should I brew my coffee?',
    answer: 'Brew time varies by method: Pour Over (2-4 minutes), French Press (4 minutes), Espresso (25-30 seconds), AeroPress (1-2 minutes), Cold Brew (12-24 hours). Our timer is pre-set for each method.',
  },
  {
    question: 'Is my data saved securely?',
    answer: 'Yes! All your saved recipes are stored locally on your device using localStorage. We don\'t collect any personal data or send information to any servers. Your recipes stay on your device.',
  },
  {
    question: 'Can I use this calculator offline?',
    answer: 'Yes! Once you\'ve loaded the page, the calculator works completely offline. Your saved recipes will also be available offline since they\'re stored locally.',
  },
  {
    question: 'What\'s the difference between Light, Medium, and Strong?',
    answer: 'These settings adjust the coffee-to-water ratio. Light uses more water for a milder taste, Medium is the standard ratio, and Strong uses less water for a more intense flavor.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-amber-700 text-center mb-12">
          Everything you need to know about brewing the perfect cup.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
              >
                <span className="font-semibold text-amber-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
