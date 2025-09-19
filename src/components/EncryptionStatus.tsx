import { useState, useEffect } from 'react';
import { Shield, Key, Lock, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EncryptionStatusProps {
  isEncrypted: boolean;
  auctionEndTime?: number;
  bidCount?: number;
}

const EncryptionStatus = ({ isEncrypted, auctionEndTime, bidCount = 0 }: EncryptionStatusProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!auctionEndTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const endTime = auctionEndTime * 1000;
      const remaining = endTime - now;

      if (remaining <= 0) {
        setTimeRemaining('Auction Ended');
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  if (!isEncrypted) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Eye className="w-4 h-4" />
        <span>Public Auction</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 font-medium">FHE-Encrypted Auction</span>
        </div>
        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
          {bidCount} Encrypted Bids
        </Badge>
      </div>

      {auctionEndTime && (
        <div className="flex items-center gap-2 text-sm">
          <Lock className="w-3 h-3 text-cyan-400" />
          <span className="text-cyan-300">
            Ends in: <span className="font-mono">{timeRemaining}</span>
          </span>
        </div>
      )}

      <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-cyan-400 font-medium">Encryption Details</span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {showDetails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-1 text-xs text-cyan-300">
            <div className="flex justify-between">
              <span>Encryption Type:</span>
              <span className="font-mono">FHE (Fully Homomorphic)</span>
            </div>
            <div className="flex justify-between">
              <span>Algorithm:</span>
              <span className="font-mono">AES-256 + RSA-2048</span>
            </div>
            <div className="flex justify-between">
              <span>Key Size:</span>
              <span className="font-mono">256-bit</span>
            </div>
            <div className="flex justify-between">
              <span>Privacy Level:</span>
              <span className="text-green-400">Maximum</span>
            </div>
          </div>
        )}

        <div className="mt-2 text-xs text-cyan-400/80">
          🔐 All bid data is encrypted and private until auction close
        </div>
      </div>
    </div>
  );
};

export default EncryptionStatus;
