import { Address } from 'viem';

export const CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' as Address;

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "basePrice",
        "type": "uint256"
      }
    ],
    "name": "LandPlotCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "encryptedBid",
        "type": "bytes"
      }
    ],
    "name": "EncryptedBidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bidAmount",
        "type": "uint256"
      }
    ],
    "name": "BidRevealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalPrice",
        "type": "uint256"
      }
    ],
    "name": "LandSold",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getLandPlot",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "y",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "basePrice",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isAvailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isEncrypted",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "auctionEndTime",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "metadataURI",
            "type": "string"
          }
        ],
        "internalType": "struct PrivateLandVault.LandPlot",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      }
    ],
    "name": "isCoordinateAvailable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "encryptedBidData",
        "type": "bytes"
      }
    ],
    "name": "placeEncryptedBid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "auctionDuration",
        "type": "uint256"
      }
    ],
    "name": "startEncryptedAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
