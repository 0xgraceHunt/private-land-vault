import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutPrivacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Privacy-First <span className="holographic">Land Sales</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary approach to metaverse real estate that eliminates speculation 
              and ensures fair pricing through encrypted transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="glass p-8 glow-subtle">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Encrypted Transactions</h3>
              <p className="text-muted-foreground">
                All land purchases are encrypted using advanced cryptographic protocols. 
                Transaction details remain hidden until the sale is finalized, preventing 
                market manipulation and speculation.
              </p>
            </Card>

            <Card className="glass p-8 glow-subtle">
              <Lock className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Private Sales</h3>
              <p className="text-muted-foreground">
                Join exclusive private sales where land prices and availability are only 
                revealed to verified participants. This creates a fair marketplace free 
                from external price manipulation.
              </p>
            </Card>

            <Card className="glass p-8 glow-subtle">
              <Eye className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Anti-Speculation</h3>
              <p className="text-muted-foreground">
                By hiding transaction details during the sale process, we prevent 
                speculators from inflating prices and ensure genuine users can purchase 
                land at fair market value.
              </p>
            </Card>

            <Card className="glass p-8 glow-subtle">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Community Focused</h3>
              <p className="text-muted-foreground">
                Our privacy-first approach prioritizes building genuine metaverse 
                communities over financial speculation, creating lasting value for 
                all participants.
              </p>
            </Card>
          </div>

          <div className="text-center glass p-12 rounded-2xl glow-primary">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">1</div>
                <h4 className="text-xl font-semibold mb-3">Browse & Select</h4>
                <p className="text-muted-foreground">
                  Explore available land plots in our VR marketplace. Each plot shows 
                  encrypted pricing information.
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">2</div>
                <h4 className="text-xl font-semibold mb-3">Join Private Sale</h4>
                <p className="text-muted-foreground">
                  Connect your wallet and join the encrypted sale. Your transaction 
                  details remain private throughout the process.
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <h4 className="text-xl font-semibold mb-3">Finalize Purchase</h4>
                <p className="text-muted-foreground">
                  Complete the transaction securely. Only then are the final details 
                  revealed and ownership transferred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPrivacy;