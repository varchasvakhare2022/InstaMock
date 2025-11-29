import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react'

interface DropzoneUploaderProps {
  onFileSelect: (file: File) => void
  maxSize?: number
  accept?: Record<string, string[]>
}

const DropzoneUploader = ({ onFileSelect, maxSize = 10 * 1024 * 1024, accept }: DropzoneUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setSelectedFile(file)
        onFileSelect(file)
        
        // Create preview
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: accept || {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    multiple: false,
  })

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`group relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isDragActive 
                  ? 'bg-primary/20 scale-110' 
                  : 'bg-muted group-hover:bg-primary/10'
              }`}>
                <Upload className={`h-10 w-10 transition-colors duration-300 ${
                  isDragActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                }`} />
              </div>
            </div>
            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">Drop the image here</p>
                <p className="text-sm text-muted-foreground">Release to upload</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  Drag & drop an image here
                </p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-primary font-medium underline">click to browse</span>
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  Supports PNG, JPG, JPEG, GIF, WEBP (max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative group border-2 border-border rounded-xl overflow-hidden bg-muted/30 animate-fade-in">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-[500px] object-contain bg-muted/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </div>
          
          <button
            onClick={handleRemove}
            className="absolute top-4 right-4 p-2.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-all duration-200 hover:scale-110 shadow-lg z-10"
            aria-label="Remove image"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="glass rounded-lg p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedFile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile?.size || 0) / 1024 / 1024} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropzoneUploader
