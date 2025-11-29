import { Link } from 'react-router-dom'
import { Code2, Type, Image, Sparkles, ArrowRight, Zap } from 'lucide-react'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-20 md:py-28 space-y-8">
        <div className="flex justify-center animate-slide-up">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border border-primary/20">
              <Code2 className="h-20 w-20 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">Instamock</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into production-ready React components. 
            <span className="block mt-2">AI-powered UI to JSX generator with Tailwind CSS.</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link
            to="/text-to-jsx"
            className="btn-primary inline-flex items-center justify-center space-x-2 group"
          >
            <Type className="h-5 w-5" />
            <span>Text to JSX</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/image-to-jsx"
            className="btn-secondary inline-flex items-center justify-center space-x-2 group"
          >
            <Image className="h-5 w-5" />
            <span>Image to JSX</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-24">
        <div className="card group hover:border-primary/50 transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Type className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold">Text to JSX</h3>
              <p className="text-muted-foreground leading-relaxed">
                Describe your UI in plain English and get clean, production-ready React JSX code
                with Tailwind CSS styling. Perfect for rapid prototyping and component generation.
              </p>
              <Link
                to="/text-to-jsx"
                className="inline-flex items-center space-x-2 text-primary hover:underline font-medium group/link"
              >
                <span>Get started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="card group hover:border-primary/50 transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold">Image to JSX</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload a screenshot or design mockup and let AI reverse-engineer it into accurate
                JSX code with proper layout and styling. Recreate any UI instantly.
              </p>
              <Link
                to="/image-to-jsx"
                className="inline-flex items-center space-x-2 text-primary hover:underline font-medium group/link"
              >
                <span>Get started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 card bg-gradient-to-br from-card to-card/50 border-primary/10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/25">
              1
            </div>
            <h3 className="text-lg font-semibold">Input</h3>
            <p className="text-muted-foreground leading-relaxed">
              Provide a text description or upload an image of your desired UI. Our AI understands natural language and visual designs.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/25">
              2
            </div>
            <h3 className="text-lg font-semibold">AI Processing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our advanced AI analyzes your input and generates structured, production-ready JSX code with proper component architecture.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/25">
              3
            </div>
            <h3 className="text-lg font-semibold">Get Code</h3>
            <p className="text-muted-foreground leading-relaxed">
              Copy or download the generated component code and use it directly in your React project. No manual adjustments needed.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center space-y-6 p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <Zap className="h-12 w-12 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Ready to Build?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Start generating production-ready React components in seconds. No setup required.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/text-to-jsx" className="btn-primary">
            Start Creating
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
