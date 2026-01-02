export default function TermsPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Terms of Service</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose prose-amber max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 2026</p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By using Coffee Brew Calculator, you agree to these terms. If you don&apos;t agree, 
            please don&apos;t use our service.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Service Description</h2>
          <p className="text-gray-700">
            Coffee Brew Calculator is a free online tool that helps you calculate coffee-to-water 
            ratios for various brewing methods. The service is provided &quot;as is&quot; without warranties.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Use of Service</h2>
          <p className="text-gray-700">
            You may use this service for personal, non-commercial purposes. You agree not to:
          </p>
          <ul className="text-gray-700 list-disc pl-6 mt-2">
            <li>Attempt to disrupt or overload our servers</li>
            <li>Use automated systems to access the service</li>
            <li>Copy or redistribute our content without permission</li>
          </ul>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Disclaimer</h2>
          <p className="text-gray-700">
            The calculations provided are for guidance only. Results may vary based on coffee 
            freshness, grind size, water quality, and other factors. We are not responsible 
            for the quality of your coffee.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Limitation of Liability</h2>
          <p className="text-gray-700">
            We shall not be liable for any indirect, incidental, or consequential damages 
            arising from your use of this service.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these terms at any time. Continued use of the service after changes 
            constitutes acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  )
}
