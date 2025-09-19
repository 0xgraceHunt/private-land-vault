# Private Land Vault

A revolutionary metaverse land marketplace with encrypted private sales, preventing speculation and manipulation. Built with FHE (Fully Homomorphic Encryption) for maximum privacy and security.

## Features

- **Encrypted Private Sales**: All land purchases are encrypted until finalization, preventing front-running and manipulation
- **VR Integration**: Preview and interact with your land in immersive virtual reality
- **Blockchain Security**: Blockchain-verified ownership with immediate NFT transfer
- **FHE Encryption**: Core data is encrypted using Fully Homomorphic Encryption for maximum privacy
- **Fair Pricing**: Revolutionary encrypted land sales ensure fair pricing for everyone

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **VR**: WebXR integration for immersive experiences

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/0xgraceHunt/private-land-vault.git

# Navigate to the project directory
cd private-land-vault

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## How It Works

1. **Browse Land**: Explore the VR land grid with encrypted pricing
2. **Private Purchase**: Make encrypted bids that remain private until finalization
3. **VR Preview**: Preview your land in immersive virtual reality
4. **Secure Transfer**: Receive blockchain-verified NFT ownership

## Smart Contracts

The project includes FHE-encrypted smart contracts that ensure:
- Private bidding until auction close
- Fair price discovery
- Secure land transfer
- Immutable ownership records

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/             # Application pages
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── contracts/         # Smart contract interfaces
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional VR features
- [ ] Mobile wallet support
- [ ] Advanced FHE features
- [ ] Community governance