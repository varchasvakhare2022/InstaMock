import { useState } from 'react'
import { generateFromText } from '../api/client'
import { useStore } from '../store/useStore'
import Spinner from '../components/Spinner'
import ResultPanel from '../components/ResultPanel'
import toast from 'react-hot-toast'
import { Sparkles, Type, ArrowRight } from 'lucide-react'

const TextToJSX = () => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const { setCurrentResult, currentResult } = useStore()

  const examplePrompts = [
    'Create a modern login page with email, password, remember me, submit button, and side illustration',
    'Build a dashboard header with logo, navigation menu, user avatar, and notification bell',
    'Design a product card with image, title, price, rating stars, and add to cart button',
    'Create a hero section with heading, subheading, CTA buttons, and background gradient',
  ]

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter a description')
      return
    }

    setLoading(true)
    try {
      const response = await generateFromText(text)
      
      if (response.success) {
        const result = {
          jsx_code: response.jsx_code,
          component_name: response.component_name,
          type: 'text' as const,
          input: text,
          timestamp: Date.now(),
        }
        setCurrentResult(result)
        toast.success('JSX generated successfully!', {
          icon: '✨',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        toast.error(response.message || 'Failed to generate JSX')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setText(example)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 pb-8">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20">
            <Type className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="gradient-text">Text to JSX</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your UI in plain English and get production-ready React JSX code
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="card">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold flex items-center space-x-2">
                <span>UI Description</span>
                <span className="text-xs text-muted-foreground font-normal">(Required)</span>
              </label>
              <textarea
                id="description"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="E.g., Create a modern login page with email, password, remember me, submit button, and side illustration"
                className="input min-h-[200px] resize-y"
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                {text.length} characters
              </p>
            </div>

            {/* Example Prompts */}
            <div className="space-y-3 pt-4 border-t">
              <p className="text-sm font-semibold text-muted-foreground">Example prompts:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {examplePrompts.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(example)}
                    className="p-3 text-sm border rounded-lg hover:bg-accent hover:border-primary/50 transition-all duration-200 text-left group"
                  >
                    <span className="group-hover:text-primary transition-colors">{example}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="btn-primary w-full py-4 text-base flex items-center justify-center space-x-2 group"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>Generate UI</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {/* Result Section */}
      {currentResult && (
        <div className="mt-12 animate-slide-up">
          <ResultPanel
            jsxCode={currentResult.jsx_code}
            componentName={currentResult.component_name}
          />
        </div>
      )}
    </div>
  )
}

export default TextToJSX
