import ToolComponent from '@/components/tool/ToolComponent'

export default function Home() {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Coffee Brew Calculator
        </h1>
        <p className="text-lg text-amber-700">
          Calculate the perfect coffee-to-water ratio for any brewing method. 
          Get consistent, delicious coffee every time.
        </p>
      </div>
      <ToolComponent />
    </div>
  )
}
