import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Code, Shield, Wallet, Map, Users } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              <span className="holographic">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete guide to using MetaLand's privacy-first virtual real estate platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Book className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Getting Started</h3>
              <p className="text-muted-foreground mb-4">
                Learn the basics of navigating MetaLand and understanding our privacy-first approach.
              </p>
              <Button variant="outline" className="w-full glass border-primary/30">
                Read Guide
              </Button>
            </Card>

            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Wallet className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Wallet Setup</h3>
              <p className="text-muted-foreground mb-4">
                Connect your crypto wallet and prepare for encrypted land transactions.
              </p>
              <Button variant="outline" className="w-full glass border-accent/30">
                Setup Guide
              </Button>
            </Card>

            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Map className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Land Grid Guide</h3>
              <p className="text-muted-foreground mb-4">
                Understand how to navigate and select plots in our VR land marketplace.
              </p>
              <Button variant="outline" className="w-full glass border-primary/30">
                Explore Guide
              </Button>
            </Card>

            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Shield className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Privacy Technology</h3>
              <p className="text-muted-foreground mb-4">
                Deep dive into our encryption methods and anti-speculation mechanisms.
              </p>
              <Button variant="outline" className="w-full glass border-accent/30">
                Technical Docs
              </Button>
            </Card>

            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Private Sales</h3>
              <p className="text-muted-foreground mb-4">
                How to join and participate in encrypted private land sales.
              </p>
              <Button variant="outline" className="w-full glass border-primary/30">
                Join Guide
              </Button>
            </Card>

            <Card className="glass p-6 glow-subtle hover:glow-primary transition-all duration-300">
              <Code className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">API Reference</h3>
              <p className="text-muted-foreground mb-4">
                Developer documentation for integrating with MetaLand platform.
              </p>
              <Button variant="outline" className="w-full glass border-accent/30">
                API Docs
              </Button>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass p-8 glow-primary">
              <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">1</div>
                  <p>Connect your Web3 wallet (MetaMask, WalletConnect supported)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">2</div>
                  <p>Browse the VR land grid and select your desired plot</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">3</div>
                  <p>Join a private sale to access encrypted pricing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">4</div>
                  <p>Complete your purchase with privacy protection</p>
                </div>
              </div>
            </Card>

            <Card className="glass p-8 glow-accent">
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What makes MetaLand different?</h4>
                  <p className="text-muted-foreground text-sm">Our encrypted transaction system prevents speculation and ensures fair pricing for all participants.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How does privacy protection work?</h4>
                  <p className="text-muted-foreground text-sm">Transaction details are encrypted during the sale process and only revealed upon finalization.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What cryptocurrencies are supported?</h4>
                  <p className="text-muted-foreground text-sm">We currently support ETH and other major cryptocurrencies through Web3 wallet integration.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;