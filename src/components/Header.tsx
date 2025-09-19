import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CubeEarthLogo from './CubeEarthLogo';

const Header = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <CubeEarthLogo size={50} />
            <div className="text-xl font-bold holographic">
              MetaLand
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/marketplace" className="text-foreground/80 hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="/about-privacy" className="text-foreground/80 hover:text-primary transition-colors">
              About Privacy
            </a>
            <a href="/docs" className="text-foreground/80 hover:text-primary transition-colors">
              Docs
            </a>
          </nav>

          {/* Wallet Connect */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal}
                          className="glass glow-primary hover:glow-accent border border-primary/30 hover:border-primary/60 transition-all duration-300"
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal}
                          className="glass glow-accent border border-accent/30 hover:border-accent/60 transition-all duration-300"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={openChainModal}
                          className="glass border border-primary/30 hover:border-primary/60 transition-all duration-300"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          className="glass glow-primary hover:glow-accent border border-primary/30 hover:border-primary/60 transition-all duration-300"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
};

export default Header;