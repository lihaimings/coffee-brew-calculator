export default function PrivacyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose prose-amber max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 2026</p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Overview</h2>
          <p className="text-gray-700">
            Coffee Brew Calculator is committed to protecting your privacy. This policy explains 
            how we handle information when you use our service.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Data Collection</h2>
          <p className="text-gray-700">
            <strong>We do not collect any personal data.</strong> Our calculator runs entirely 
            in your browser. We don&apos;t use cookies, analytics, or tracking scripts.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Local Storage</h2>
          <p className="text-gray-700">
            Your saved recipes are stored locally on your device using your browser&apos;s 
            localStorage feature. This data never leaves your device and is not accessible to us.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Third-Party Services</h2>
          <p className="text-gray-700">
            We do not use any third-party services that collect user data. The website is 
            hosted on Cloudflare Pages, which may collect basic server logs for security purposes.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Your Rights</h2>
          <p className="text-gray-700">
            Since we don&apos;t collect personal data, there&apos;s nothing to delete or export. 
            You can clear your saved recipes at any time by clearing your browser&apos;s localStorage.
          </p>

          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-3">Contact</h2>
          <p className="text-gray-700">
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </div>
      </div>
    </div>
  )
}
