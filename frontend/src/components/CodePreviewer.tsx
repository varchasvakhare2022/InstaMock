import { Copy, Download, Check } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CodePreviewerProps {
  code: string
  componentName: string
}

const CodePreviewer = ({ code, componentName }: CodePreviewerProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard!', {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${componentName}.jsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!', {
      icon: '📥',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h3 className="text-xl font-semibold">Generated Code</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Component: <span className="font-mono text-primary">{componentName}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="btn-primary flex items-center space-x-2 px-4 py-2 text-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2 px-4 py-2 text-sm"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <pre className="code-block relative">
          <code className="block whitespace-pre-wrap break-words">{code}</code>
        </pre>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border/50 rounded-md text-xs text-muted-foreground">
            {code.split('\n').length} lines
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePreviewer
