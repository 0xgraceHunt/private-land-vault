import { Button } from '@/components/ui/button';
import { Shield, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-1 h-1 bg-accent rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        <div className="absolute bottom-64 right-32 w-1 h-1 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-64 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Buy Metaverse Land 
            <br />
            <span className="holographic">in Privacy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Revolutionary encrypted land sales prevent speculation and manipulation. 
            Your purchases remain private until finalized, ensuring fair pricing for everyone.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="glass p-6 rounded-2xl glow-subtle hover:glow-primary transition-all duration-300">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Encrypted Sales</h3>
            <p className="text-muted-foreground">
              All purchases are encrypted until finalization, preventing front-running
            </p>
          </div>
          
          <div className="glass p-6 rounded-2xl glow-subtle hover:glow-accent transition-all duration-300">
            <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">VR Integration</h3>
            <p className="text-muted-foreground">
              Preview and interact with your land in immersive virtual reality
            </p>
          </div>
          
          <div className="glass p-6 rounded-2xl glow-subtle hover:glow-primary transition-all duration-300">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Instant Ownership</h3>
            <p className="text-muted-foreground">
              Blockchain-verified ownership with immediate NFT transfer
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="glass glow-primary hover:glow-accent border border-primary/30 hover:border-primary/60 transition-all duration-300 text-lg px-8 py-4"
          >
            Explore Land Grid
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="glass border-accent/30 hover:border-accent/60 hover:glow-accent transition-all duration-300 text-lg px-8 py-4"
          >
            Learn About Privacy
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Land Plots</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">100%</div>
            <div className="text-muted-foreground">Private Sales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">VR Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;