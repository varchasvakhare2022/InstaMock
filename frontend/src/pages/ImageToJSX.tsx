import { useState } from 'react'
import { generateFromImage } from '../api/client'
import { useStore } from '../store/useStore'
import Spinner from '../components/Spinner'
import ResultPanel from '../components/ResultPanel'
import DropzoneUploader from '../components/DropzoneUploader'
import toast from 'react-hot-toast'
import { Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react'

const ImageToJSX = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { setCurrentResult, currentResult } = useStore()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)
    try {
      const response = await generateFromImage(selectedFile)
      
      if (response.success) {
        const result = {
          jsx_code: response.jsx_code,
          component_name: response.component_name,
          type: 'image' as const,
          input: selectedFile.name,
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

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 pb-8">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="gradient-text">Image to JSX</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload a screenshot or design mockup and get React JSX code
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Section */}
        <div className="card">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center space-x-2">
                <span>Upload Image</span>
                <span className="text-xs text-muted-foreground font-normal">(Required)</span>
              </label>
              <DropzoneUploader onFileSelect={handleFileSelect} />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !selectedFile}
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
              <span>Generate JSX</span>
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

export default ImageToJSX
