import RotatingGlobe from './RotatingGlobe';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-border/20 mt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Rotating Globe */}
        <div className="text-center mb-12">
          <RotatingGlobe />
          <h3 className="text-2xl font-bold mt-6 mb-2 holographic">
            The Future of Virtual Real Estate
          </h3>
          <p className="text-muted-foreground">
            Secure, private, and revolutionary metaverse land ownership
          </p>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">MetaLand</h4>
            <p className="text-muted-foreground mb-4">
              Revolutionary encrypted metaverse land sales platform preventing speculation 
              and ensuring fair pricing for all users.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Land Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">VR Preview</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Private Sales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">NFT Integration</a></li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="text-lg font-bold mb-4">Privacy Tech</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Encryption Methods</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Zero-Knowledge Proofs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Commit-Reveal Scheme</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Anti-MEV Protection</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Wallet Setup</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">VR Requirements</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/20 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 MetaLand. All rights reserved. Building the future of private virtual real estate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;