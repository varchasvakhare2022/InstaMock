import { useState } from 'react'
import CodePreviewer from './CodePreviewer'
import LivePreview from './LivePreview'
import { Eye, Code, FileCode } from 'lucide-react'

interface ResultPanelProps {
  jsxCode: string
  componentName: string
}

const ResultPanel = ({ jsxCode, componentName }: ResultPanelProps) => {
  const [showPreview, setShowPreview] = useState(false)


  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card border-primary/20 bg-gradient-to-br from-card to-card/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <FileCode className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Generated Component</h2>
            </div>
            <p className="text-muted-foreground">
              Component name: <span className="font-mono text-primary font-semibold">{componentName}</span>
            </p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary flex items-center space-x-2 px-4 py-2 text-sm whitespace-nowrap"
          >
            {showPreview ? (
              <>
                <Code className="h-4 w-4" />
                <span>Show Code</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show Preview</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6">
          {showPreview ? (
            <div className="animate-fade-in">
              <LivePreview jsxCode={jsxCode} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <CodePreviewer code={jsxCode} componentName={componentName} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultPanel
