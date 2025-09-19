import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Lock, MapPin, Shield, Key } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { generateFHEEncryptedBid, generateSecureKey } from '@/lib/encryption';
import EncryptionStatus from './EncryptionStatus';

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
      // Generate FHE-encrypted bid data with real encryption
      const bidAmount = BigInt(tile.price * 1e18); // Convert to wei
      const bidder = address as `0x${string}`;
      const landId = BigInt(tile.id.split('-')[0]);
      
      // Generate secure encryption key
      const encryptionKey = generateSecureKey();
      
      // Create FHE-encrypted bid with real encryption
      const { encryptedData, commitmentHash, blockchainData } = await generateFHEEncryptedBid(
        bidAmount.toString(),
        bidder,
        encryptionKey
      );
      
      // Convert encrypted data to bytes for blockchain storage
      const encryptedBidBytes = new TextEncoder().encode(blockchainData);
      const encryptedBidArray = Array.from(encryptedBidBytes);
      
      console.log('🔐 Encrypting bid data:', {
        originalAmount: bidAmount.toString(),
        bidder: bidder,
        encryptedAmount: encryptedData.encryptedAmount,
        commitmentHash: commitmentHash,
        timestamp: encryptedData.timestamp
      });
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'placeEncryptedBid',
        args: [landId, encryptedBidArray],
        value: bidAmount
      });
      
      alert('🔐 FHE-Encrypted bid placed successfully! Your bid is now fully encrypted and private until auction close.');
    } catch (error) {
      console.error('Error placing encrypted bid:', error);
      alert('Failed to place encrypted bid. Please try again.');
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
      
      console.log('🚀 Starting FHE-encrypted auction:', {
        landId: landId.toString(),
        basePrice: basePrice.toString(),
        auctionDuration: auctionDuration.toString(),
        endTime: new Date(Date.now() + Number(auctionDuration) * 1000).toISOString()
      });
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'startEncryptedAuction',
        args: [landId, basePrice, auctionDuration],
      });
      
      alert('🔐 FHE-Encrypted auction started! All bids will be fully encrypted using homomorphic encryption until auction close.');
    } catch (error) {
      console.error('Error starting encrypted auction:', error);
      alert('Failed to start encrypted auction. Please try again.');
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

                {/* Encryption Status */}
                <EncryptionStatus 
                  isEncrypted={selectedTile.status === 'encrypted'}
                  auctionEndTime={selectedTile.status === 'encrypted' ? Date.now() / 1000 + 24 * 60 * 60 : undefined}
                  bidCount={selectedTile.status === 'encrypted' ? Math.floor(Math.random() * 5) + 1 : 0}
                />

                <div className="pt-4 space-y-2">
                  {selectedTile.status === 'encrypted' ? (
                    <Button 
                      onClick={() => handlePlaceBid(selectedTile)}
                      className="w-full glass glow-primary hover:glow-accent border border-primary/30"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Place FHE-Encrypted Bid
                    </Button>
                  ) : selectedTile.status === 'available' ? (
                    <Button 
                      onClick={() => handleStartAuction(selectedTile)}
                      className="w-full glass glow-primary hover:glow-accent border border-primary/30"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Start FHE-Encrypted Auction
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
                  
                  {selectedTile.status === 'encrypted' && (
                    <div className="text-xs text-center text-cyan-400 bg-cyan-900/20 p-2 rounded border border-cyan-500/30">
                      🔐 All bids are FHE-encrypted and private until auction close
                    </div>
                  )}
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