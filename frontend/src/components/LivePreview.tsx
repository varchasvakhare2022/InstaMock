import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'

interface LivePreviewProps {
  jsxCode: string
}

const LivePreview = ({ jsxCode }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const codeRef = useRef<string>('')

  useEffect(() => {
    // Prevent re-rendering if code hasn't changed
    if (codeRef.current === jsxCode && iframeRef.current?.srcdoc) {
      return
    }

    codeRef.current = jsxCode
    setError(null)
    setIsLoading(true)

    if (!iframeRef.current) return

    try {
      // Prepare the code - handle various formats
      let code = jsxCode.trim()
      
      // Remove markdown code blocks if present (common in AI responses)
      code = code.replace(/```json\s*/g, '')
      code = code.replace(/```jsx\s*/g, '')
      code = code.replace(/```javascript\s*/g, '')
      code = code.replace(/```typescript\s*/g, '')
      code = code.replace(/```\s*$/gm, '')
      code = code.trim()
      
      // Try to parse as JSON if it looks like JSON (common in image-generated code)
      if (code.startsWith('{') || (code.startsWith('"') && code.endsWith('"'))) {
        try {
          const parsed = JSON.parse(code)
          if (typeof parsed === 'object' && parsed.jsx) {
            code = parsed.jsx
            // Also update component name if available
            if (parsed.component_name) {
              componentName = parsed.component_name
            }
          } else if (typeof parsed === 'string') {
            code = parsed
          }
        } catch (e) {
          // If full JSON parse fails, try to extract jsx field using regex
          if (code.includes('"jsx"') && code.includes('"component_name"')) {
            try {
              // Extract jsx value from JSON string
              const jsxMatch = code.match(/"jsx"\s*:\s*"((?:[^"\\]|\\.)*)"/s)
              const nameMatch = code.match(/"component_name"\s*:\s*"([^"]+)"/)
              
              if (jsxMatch && jsxMatch[1]) {
                code = jsxMatch[1]
                // Unescape the code
                code = code.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'")
                code = code.replace(/\\t/g, '\t').replace(/\\r/g, '\r')
                
                if (nameMatch && nameMatch[1]) {
                  componentName = nameMatch[1]
                }
              }
            } catch (extractError) {
              // Extraction failed, continue with original code
              console.warn('Failed to extract JSX from JSON:', extractError)
            }
          }
        }
      }
      
      // Handle escaped strings (common in image-generated code from JSON)
      if (code.includes('\\n') || code.includes('\\"')) {
        // Unescape common escape sequences
        code = code
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\t/g, '\t')
          .replace(/\\r/g, '\r')
          .replace(/\\\\/g, '\\')
      }
      
      // Remove export default
      code = code.replace(/export\s+default\s+/g, '')
      
      // Remove React imports (we'll provide React in the iframe)
      code = code.replace(/import\s+React[^;]*from[^;]*;?\s*/g, '')
      code = code.replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"];?\s*/g, '')
      
      // Extract component name - try multiple patterns
      let componentName = 'Component'
      const patterns = [
        /const\s+(\w+)\s*=\s*\(/,
        /const\s+(\w+)\s*=/,
        /function\s+(\w+)\s*\(/,
        /export\s+(?:const|function)\s+(\w+)/,
      ]
      
      for (const pattern of patterns) {
        const match = code.match(pattern)
        if (match && match[1] && match[1][0] === match[1][0].toUpperCase()) {
          componentName = match[1]
          break
        }
      }
      
      // If still not found, look for any capitalized identifier
      if (componentName === 'Component') {
        const anyMatch = code.match(/(?:const|function|export)\s+([A-Z][a-zA-Z0-9]+)/)
        if (anyMatch && anyMatch[1]) {
          componentName = anyMatch[1]
        }
      }

      // Escape the code for embedding in HTML template literal
      // Must escape backticks and template literal expressions to prevent syntax errors
      const escapedCode = code
        .replace(/\\/g, '\\\\')     // Escape backslashes first (must be first!)
        .replace(/`/g, '\\`')        // Escape backticks (critical for template literals)
        .replace(/\${/g, '\\${')     // Escape template literal expressions
        .replace(/\r\n/g, '\n')      // Normalize line endings
        .replace(/\r/g, '\n')        // Normalize line endings

      // Create HTML content with all dependencies
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Component Preview</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
    }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      padding: 16px;
      background: white;
    }
    #root { 
      width: 100%; 
      min-height: 100vh; 
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createContext } = React;
    
    try {
      ${escapedCode}
      
      // Verify component exists
      if (typeof ${componentName} === 'undefined') {
        const available = Object.keys(window).filter(k => 
          typeof window[k] === 'function' && k[0] === k[0].toUpperCase()
        ).join(', ');
        throw new Error('Component "${componentName}" is not defined. Available: ' + (available || 'none'));
      }
      
      // Render the component
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        throw new Error('Root element not found');
      }
      
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(${componentName}));
      
      console.log('Preview: Component "${componentName}" rendered successfully');
    } catch (err) {
      const errorMsg = err.message || 'Unknown error';
      const errorStack = err.stack || '';
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.innerHTML = 
          '<div style="padding: 20px; color: #dc2626; background: #fee2e2; border-radius: 8px; border: 1px solid #fecaca; font-family: monospace; font-size: 12px; line-height: 1.5;">' +
          '<strong style="display: block; margin-bottom: 8px;">Preview Error:</strong>' + 
          '<div style="margin-bottom: 12px;">' + errorMsg + '</div>' +
          (errorStack ? '<details style="margin-top: 8px;"><summary style="cursor: pointer; color: #991b1b;">Stack trace</summary><pre style="font-size: 10px; margin-top: 8px; white-space: pre-wrap; word-break: break-all;">' + errorStack.substring(0, 500) + '</pre></details>' : '') +
          '<div style="margin-top: 12px; font-size: 11px; color: #991b1b;">Check browser console for more details</div></div>';
      }
      console.error('Preview error:', err);
      console.error('Component name:', '${componentName}');
      console.error('Code preview (first 500 chars):', \`${code.substring(0, 500).replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`);
    }
  </script>
</body>
</html>`

      const iframe = iframeRef.current

      // Set up iframe
      iframe.style.width = '100%'
      iframe.style.minHeight = '400px'
      iframe.style.border = 'none'
      iframe.style.background = 'white'
      iframe.style.borderRadius = '8px'

      // Handle load with proper cleanup
      let loaded = false
      const handleLoad = () => {
        if (loaded) return
        loaded = true
        
        // Small delay to ensure content is rendered
        setTimeout(() => {
          setIsLoading(false)
          
          // Check for errors in iframe
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (iframeDoc) {
              const root = iframeDoc.getElementById('root')
              if (root) {
                // Check for error messages
                const hasError = root.innerHTML.includes('Preview Error:') || 
                                root.textContent?.includes('Error:') ||
                                root.innerHTML.includes('Error:')
                
                if (hasError) {
                  const errorText = root.textContent || root.innerHTML
                  setError(`Rendering error: ${errorText.substring(0, 150)}...`)
                } else if (root.children.length === 0 && !root.textContent?.trim()) {
                  // Empty after load might indicate an issue
                  setTimeout(() => {
                    if (iframeDoc.getElementById('root')?.children.length === 0) {
                      setError('Component rendered but appears empty. The code might not be producing any visible output.')
                    }
                  }, 1000)
                }
              }
            }
          } catch (e) {
            // Cross-origin restrictions - can't check, assume it's working
            console.log('Cannot access iframe content (expected in some browsers)')
          }
        }, 500)
      }

      const handleError = () => {
        if (loaded) return
        loaded = true
        setError('Failed to load preview iframe')
        setIsLoading(false)
      }

      // Remove old listeners
      iframe.onload = null
      iframe.onerror = null
      
      // Add new listeners
      iframe.onload = handleLoad
      iframe.onerror = handleError

      // Set content using srcdoc
      iframe.srcdoc = htmlContent

      // Timeout fallback
      const timeout = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false)
          setError('Preview took too long to load. The code may have errors or the component may be too complex.')
        }
      }, 15000)

      return () => {
        clearTimeout(timeout)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process code for preview')
      setIsLoading(false)
      console.error('Preview setup error:', err)
    }
  }, [jsxCode]) // Only depend on jsxCode

  if (error) {
    return (
      <div className="p-8 border-2 border-destructive/20 rounded-xl bg-destructive/10">
        <div className="flex items-center space-x-2 text-destructive mb-2">
          <AlertCircle className="h-5 w-5" />
          <p className="font-semibold">Preview Error</p>
        </div>
        <p className="text-sm text-destructive/80 mb-2">{error}</p>
        <details className="text-xs text-muted-foreground mt-4">
          <summary className="cursor-pointer hover:text-foreground mb-2">Show code snippet for debugging</summary>
          <pre className="mt-2 p-2 bg-muted rounded text-[10px] overflow-auto max-h-32">
            {jsxCode.substring(0, 500)}
          </pre>
        </details>
        <p className="text-xs text-muted-foreground mt-2">
          The generated code may have syntax errors or use features not supported in the preview.
          Try copying the code to your React project for better compatibility.
        </p>
      </div>
    )
  }

  return (
    <div className="border-2 border-border rounded-xl bg-background overflow-hidden">
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Live Preview</p>
        {isLoading && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Loading...</span>
          </div>
        )}
      </div>
      <div className="w-full min-h-[400px] bg-background relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10 rounded-b-xl">
            <div className="text-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">Rendering preview...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full min-h-[400px]"
          sandbox="allow-scripts allow-same-origin"
          title="Component Preview"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  )
}

export default LivePreview

