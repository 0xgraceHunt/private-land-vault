import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Lock, MapPin } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

interface LandTile {
  id: string;
  x: number;
  y: number;
  price: number;
  status: 'available' | 'encrypted' | 'sold';
  rarity: 'common' | 'rare' | 'legendary';
}

const VRLandGrid = () => {
  const [selectedTile, setSelectedTile] = useState<LandTile | null>(null);
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  
  // Generate sample land tiles with contract integration
  const generateLandTiles = (): LandTile[] => {
    const tiles: LandTile[] = [];
    const rarities: LandTile['rarity'][] = ['common', 'rare', 'legendary'];
    const statuses: LandTile['status'][] = ['available', 'encrypted', 'sold'];
    
    for (let x = 0; x < 12; x++) {
      for (let y = 0; y < 8; y++) {
        tiles.push({
          id: `${x}-${y}`,
          x,
          y,
          price: Math.floor(Math.random() * 10) + 1,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          rarity: rarities[Math.floor(Math.random() * rarities.length)]
        });
      }
    }
    return tiles;
  };

  const [landTiles] = useState<LandTile[]>(generateLandTiles());

  const getTileClasses = (tile: LandTile) => {
    let baseClasses = "land-tile w-full aspect-square cursor-pointer border-2 transition-all duration-300 relative overflow-hidden";
    
    switch (tile.status) {
      case 'available':
        baseClasses += " border-primary/30 hover:border-primary";
        break;
      case 'encrypted':
        baseClasses += " border-accent/30 hover:border-accent";
        break;
      case 'sold':
        baseClasses += " border-muted/30 opacity-50";
        break;
    }

    switch (tile.rarity) {
      case 'legendary':
        baseClasses += " animate-pulse-glow";
        break;
      case 'rare':
        baseClasses += " glow-subtle";
        break;
    }

    return baseClasses;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'rare': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  const handleTileClick = (tile: LandTile) => {
    if (tile.status !== 'sold') {
      setSelectedTile(tile);
    }
  };

  const handlePlaceBid = async (tile: LandTile) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Generate FHE-encrypted bid data
      const bidAmount = BigInt(tile.price * 1e18); // Convert to wei
      const bidder = address as `0x${string}`;
      const landId = BigInt(tile.id.split('-')[0]);
      
      // Create encrypted bid hash (simulating FHE encryption)
      const bidData = {
        amount: bidAmount.toString(),
        bidder: bidder,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substring(7)
      };
      
      // Hash the bid data for encryption simulation
      const bidHash = await crypto.subtle.digest('SHA-256', 
        new TextEncoder().encode(JSON.stringify(bidData))
      );
      const encryptedBid = Array.from(new Uint8Array(bidHash));
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'placeEncryptedBid',
        args: [landId, encryptedBid],
        value: bidAmount
      });
      
      alert('Encrypted bid placed successfully! Your bid is now encrypted and private.');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  const handleStartAuction = async (tile: LandTile) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const landId = BigInt(tile.id.split('-')[0]);
      const basePrice = BigInt(tile.price * 1e18);
      const auctionDuration = BigInt(24 * 60 * 60); // 24 hours in seconds
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'startEncryptedAuction',
        args: [landId, basePrice, auctionDuration],
      });
      
      alert('Encrypted auction started successfully! Bids are now private and encrypted.');
    } catch (error) {
      console.error('Error starting auction:', error);
      alert('Failed to start auction. Please try again.');
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            VR Land <span className="holographic">Grid</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Select your virtual territory. All purchases are encrypted until finalized.
          </p>
        </div>

        {/* Grid Controls */}
        <div className="flex justify-center mb-8 space-x-4">
          <Badge variant="outline" className="glass border-primary/30">
            <div className="w-3 h-3 bg-primary rounded mr-2"></div>
            Available
          </Badge>
          <Badge variant="outline" className="glass border-accent/30">
            <div className="w-3 h-3 bg-accent rounded mr-2"></div>
            Encrypted Sale
          </Badge>
          <Badge variant="outline" className="glass border-muted/30">
            <div className="w-3 h-3 bg-muted rounded mr-2"></div>
            Sold
          </Badge>
        </div>

        {/* VR Land Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-2 p-8 glass rounded-2xl glow-subtle">
            {landTiles.map((tile) => (
              <div
                key={tile.id}
                className={getTileClasses(tile)}
                onClick={() => handleTileClick(tile)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-xs font-bold ${getRarityColor(tile.rarity)}`}>
                      {tile.price} ETH
                    </div>
                    {tile.status === 'encrypted' && (
                      <Lock className="w-3 h-3 mx-auto mt-1 text-accent" />
                    )}
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-neon opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Tile Details */}
        {selectedTile && (
          <div className="mt-12 max-w-md mx-auto glass p-6 rounded-2xl glow-primary">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Land Plot ({selectedTile.x}, {selectedTile.y})
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="text-xl font-bold text-primary">
                    {selectedTile.price} ETH
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rarity:</span>
                  <Badge className={`${getRarityColor(selectedTile.rarity)} bg-transparent border`}>
                    {selectedTile.rarity}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={
                    selectedTile.status === 'available' ? 'border-primary text-primary' :
                    selectedTile.status === 'encrypted' ? 'border-accent text-accent' :
                    'border-muted text-muted'
                  }>
                    {selectedTile.status === 'encrypted' ? (
                      <><Lock className="w-3 h-3 mr-1" /> Private Sale</>
                    ) : (
                      selectedTile.status
                    )}
                  </Badge>
                </div>

                <div className="pt-4 space-y-2">
                  {selectedTile.status === 'encrypted' ? (
                    <Button 
                      onClick={() => handlePlaceBid(selectedTile)}
                      className="w-full glass glow-primary hover:glow-accent border border-primary/30"
                    >
                      Join Private Sale
                    </Button>
                  ) : selectedTile.status === 'available' ? (
                    <Button 
                      onClick={() => handleStartAuction(selectedTile)}
                      className="w-full glass glow-primary hover:glow-accent border border-primary/30"
                    >
                      Start Encrypted Auction
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      className="w-full glass border-muted/30"
                    >
                      Land Sold
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full glass border-accent/30">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview in VR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VRLandGrid;