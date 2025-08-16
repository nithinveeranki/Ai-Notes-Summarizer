import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, FileText, Upload, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Summarization
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Summarize your notes{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              instantly
            </span>{" "}
            using AI
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform lengthy documents into clear, concise summaries in seconds. 
            Upload files or paste text to get instant AI-powered insights.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* If user is signed out → Show Sign In / Sign Up */}
          <SignedOut>
            <SignInButton mode="redirect">
              <Button variant="hero" size="xl" className="group">
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Sign In to Start
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <Button variant="glass" size="xl">
                <FileText className="h-5 w-5" />
                Create Account
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* If user is signed in → Show Summarize Button */}
          <SignedIn>
            <Link to="/summarize">
              <Button variant="hero" size="xl" className="group">
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Summarizing Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </SignedIn>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card variant="glass" className="p-6 group hover:shadow-glow transition-all">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-muted-foreground">
              Support for PDF, DOCX, and TXT files. Just drag and drop or paste your text.
            </p>
          </Card>

          <Card variant="glass" className="p-6 group hover:shadow-glow transition-all">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-accent mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Get accurate summaries in seconds, not minutes. Powered by advanced AI technology.
            </p>
          </Card>

          <Card variant="glass" className="p-6 group hover:shadow-glow transition-all">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Insights</h3>
            <p className="text-muted-foreground">
              Extract key points, main ideas, and actionable insights from any document.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
