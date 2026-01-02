'use client'

import { useState, useEffect, useCallback } from 'react'
import { Coffee, Droplets, Scale, Clock, Save, Trash2, Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

interface BrewMethod {
  id: string
  name: string
  ratio: number // grams of water per gram of coffee
  brewTime: number // seconds
  description: string
}

interface SavedRecipe {
  id: string
  name: string
  method: string
  coffeeAmount: number
  waterAmount: number
  strength: string
  unit: 'metric' | 'imperial'
  createdAt: string
}

const BREW_METHODS: BrewMethod[] = [
  { id: 'pourover', name: 'Pour Over', ratio: 16, brewTime: 180, description: 'Clean, bright flavors' },
  { id: 'frenchpress', name: 'French Press', ratio: 15, brewTime: 240, description: 'Full-bodied, rich taste' },
  { id: 'espresso', name: 'Espresso', ratio: 2, brewTime: 25, description: 'Concentrated, intense' },
  { id: 'coldbrew', name: 'Cold Brew', ratio: 8, brewTime: 43200, description: 'Smooth, low acidity' },
  { id: 'aeropress', name: 'AeroPress', ratio: 12, brewTime: 90, description: 'Versatile, clean cup' },
]

const STRENGTH_MODIFIERS: Record<string, number> = {
  light: 1.2,
  medium: 1,
  strong: 0.85,
}

export default function ToolComponent() {
  const [method, setMethod] = useState<BrewMethod>(BREW_METHODS[0])
  const [coffeeAmount, setCoffeeAmount] = useState(20)
  const [waterAmount, setWaterAmount] = useState(320)
  const [strength, setStrength] = useState<'light' | 'medium' | 'strong'>('medium')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [recipeName, setRecipeName] = useState('')
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerTarget, setTimerTarget] = useState(0)

  // Load saved recipes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('coffeeRecipes')
    if (saved) {
      setSavedRecipes(JSON.parse(saved))
    }
  }, [])

  // Calculate water based on coffee amount
  const calculateWater = useCallback((coffee: number, methodRatio: number, strengthMod: number) => {
    return Math.round(coffee * methodRatio * strengthMod)
  }, [])

  // Update water when coffee, method, or strength changes
  useEffect(() => {
    const newWater = calculateWater(coffeeAmount, method.ratio, STRENGTH_MODIFIERS[strength])
    setWaterAmount(newWater)
  }, [coffeeAmount, method, strength, calculateWater])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timerSeconds < timerTarget) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev + 1 >= timerTarget) {
            setIsTimerRunning(false)
            playNotification()
            return timerTarget
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerSeconds, timerTarget])

  const playNotification = () => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const handleMethodChange = (methodId: string) => {
    const newMethod = BREW_METHODS.find(m => m.id === methodId)
    if (newMethod) {
      setMethod(newMethod)
      setTimerTarget(newMethod.brewTime)
      setTimerSeconds(0)
      setIsTimerRunning(false)
    }
  }

  const handleCoffeeChange = (value: number) => {
    setCoffeeAmount(value)
  }

  const convertToImperial = (grams: number) => {
    return (grams * 0.035274).toFixed(2)
  }

  const convertMlToOz = (ml: number) => {
    return (ml * 0.033814).toFixed(1)
  }

  const saveRecipe = () => {
    if (!recipeName.trim()) return
    
    const newRecipe: SavedRecipe = {
      id: Date.now().toString(),
      name: recipeName,
      method: method.name,
      coffeeAmount,
      waterAmount,
      strength,
      unit,
      createdAt: new Date().toISOString(),
    }
    
    const updated = [...savedRecipes, newRecipe]
    setSavedRecipes(updated)
    localStorage.setItem('coffeeRecipes', JSON.stringify(updated))
    setRecipeName('')
  }

  const deleteRecipe = (id: string) => {
    const updated = savedRecipes.filter(r => r.id !== id)
    setSavedRecipes(updated)
    localStorage.setItem('coffeeRecipes', JSON.stringify(updated))
  }

  const loadRecipe = (recipe: SavedRecipe) => {
    const foundMethod = BREW_METHODS.find(m => m.name === recipe.method)
    if (foundMethod) {
      setMethod(foundMethod)
      setTimerTarget(foundMethod.brewTime)
    }
    setCoffeeAmount(recipe.coffeeAmount)
    setWaterAmount(recipe.waterAmount)
    setStrength(recipe.strength as 'light' | 'medium' | 'strong')
    setUnit(recipe.unit)
  }

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600)
      const mins = Math.floor((seconds % 3600) / 60)
      return `${hours}h ${mins}m`
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    setTimerTarget(method.brewTime)
    setIsTimerRunning(true)
  }

  const resetTimer = () => {
    setTimerSeconds(0)
    setIsTimerRunning(false)
  }

  const timerProgress = timerTarget > 0 ? (timerSeconds / timerTarget) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Brewing Method Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Coffee className="w-6 h-6" />
          Select Brewing Method
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {BREW_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMethodChange(m.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                method.id === m.id
                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="font-semibold text-sm">{m.name}</div>
              <div className="text-xs text-gray-500 mt-1">{m.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6" />
            Calculate Ratio
          </h2>

          {/* Unit Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                unit === 'metric' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Metric (g/ml)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                unit === 'imperial' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Imperial (oz)
            </button>
          </div>

          {/* Coffee Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coffee Amount
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="100"
                value={coffeeAmount}
                onChange={(e) => handleCoffeeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-24 text-right font-bold text-amber-900">
                {unit === 'metric' ? `${coffeeAmount}g` : `${convertToImperial(coffeeAmount)}oz`}
              </div>
            </div>
          </div>

          {/* Strength Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strength Preference
            </label>
            <div className="flex gap-2">
              {(['light', 'medium', 'strong'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStrength(s)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-colors ${
                    strength === s
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Ratio Display */}
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <div className="text-sm text-amber-700 mb-1">Current Ratio</div>
            <div className="text-2xl font-bold text-amber-900">
              1:{Math.round(method.ratio * STRENGTH_MODIFIERS[strength])}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Droplets className="w-6 h-6" />
            Your Recipe
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Coffee className="w-8 h-8 text-amber-700" />
                <div>
                  <div className="text-sm text-amber-600">Coffee</div>
                  <div className="text-2xl font-bold text-amber-900">
                    {unit === 'metric' ? `${coffeeAmount}g` : `${convertToImperial(coffeeAmount)}oz`}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-sm text-blue-600">Water</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {unit === 'metric' ? `${waterAmount}ml` : `${convertMlToOz(waterAmount)}oz`}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Brew Time</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(method.brewTime)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Brewing Timer
        </h2>

        <div className="flex flex-col items-center">
          {/* Timer Display */}
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#fde68a"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#f59e0b"
                strokeWidth="12"
                fill="none"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * timerProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-amber-900">
                {formatTime(timerSeconds)}
              </div>
              <div className="text-sm text-amber-600">
                / {formatTime(timerTarget || method.brewTime)}
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => isTimerRunning ? setIsTimerRunning(false) : startTimer()}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={playNotification}
              className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              title="Test sound"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Save Recipe Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Save className="w-6 h-6" />
          Save Recipe
        </h2>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Recipe name (e.g., Morning Pour Over)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            onClick={saveRecipe}
            disabled={!recipeName.trim()}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>

        {/* Saved Recipes List */}
        {savedRecipes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Saved Recipes</h3>
            {savedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="cursor-pointer flex-1" onClick={() => loadRecipe(recipe)}>
                  <div className="font-medium text-gray-900">{recipe.name}</div>
                  <div className="text-sm text-gray-500">
                    {recipe.method} • {recipe.coffeeAmount}g coffee • {recipe.waterAmount}ml water • {recipe.strength}
                  </div>
                </div>
                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete recipe"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
