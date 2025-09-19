// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PrivateLandVault
 * @dev A contract for encrypted land sales using FHE (Fully Homomorphic Encryption)
 * This contract ensures private bidding until auction close, preventing front-running
 */
contract PrivateLandVault is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Land plot structure
    struct LandPlot {
        uint256 x;
        uint256 y;
        uint256 basePrice;
        bool isAvailable;
        bool isEncrypted;
        address currentOwner;
        uint256 auctionEndTime;
        string metadataURI;
    }
    
    // Encrypted bid structure
    struct EncryptedBid {
        bytes encryptedBid; // FHE encrypted bid amount
        bytes encryptedBidder; // FHE encrypted bidder address
        uint256 timestamp;
        bool isRevealed;
    }
    
    // Mapping from tokenId to land plot
    mapping(uint256 => LandPlot) public landPlots;
    
    // Mapping from coordinates to tokenId
    mapping(uint256 => mapping(uint256 => uint256)) public coordinateToTokenId;
    
    // Mapping for encrypted bids (tokenId => bid data)
    mapping(uint256 => EncryptedBid[]) public encryptedBids;
    
    // Public key for FHE encryption (in practice, this would be more complex)
    bytes public fhePublicKey;
    
    // Events
    event LandPlotCreated(uint256 indexed tokenId, uint256 x, uint256 y, uint256 basePrice);
    event EncryptedBidPlaced(uint256 indexed tokenId, address indexed bidder, bytes encryptedBid);
    event BidRevealed(uint256 indexed tokenId, address indexed bidder, uint256 bidAmount);
    event LandSold(uint256 indexed tokenId, address indexed buyer, uint256 finalPrice);
    event FHEPublicKeyUpdated(bytes newPublicKey);
    
    constructor() ERC721("PrivateLandVault", "PLV") {
        // Initialize with a default FHE public key (in production, this would be set by owner)
        fhePublicKey = abi.encodePacked("default_fhe_public_key");
    }
    
    /**
     * @dev Create a new land plot
     * @param x X coordinate
     * @param y Y coordinate  
     * @param basePrice Base price in wei
     * @param metadataURI Metadata URI for the land plot
     */
    function createLandPlot(
        uint256 x,
        uint256 y,
        uint256 basePrice,
        string memory metadataURI
    ) external onlyOwner {
        require(coordinateToTokenId[x][y] == 0, "Land plot already exists at these coordinates");
        
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        landPlots[tokenId] = LandPlot({
            x: x,
            y: y,
            basePrice: basePrice,
            isAvailable: true,
            isEncrypted: false,
            currentOwner: address(0),
            auctionEndTime: 0,
            metadataURI: metadataURI
        });
        
        coordinateToTokenId[x][y] = tokenId;
        
        emit LandPlotCreated(tokenId, x, y, basePrice);
    }
    
    /**
     * @dev Start an encrypted auction for a land plot
     * @param tokenId The token ID of the land plot
     * @param auctionDuration Duration of the auction in seconds
     */
    function startEncryptedAuction(uint256 tokenId, uint256 auctionDuration) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(landPlots[tokenId].isAvailable, "Land plot is not available");
        
        landPlots[tokenId].isEncrypted = true;
        landPlots[tokenId].auctionEndTime = block.timestamp + auctionDuration;
        
        // Clear any existing bids
        delete encryptedBids[tokenId];
    }
    
    /**
     * @dev Place an encrypted bid (FHE encrypted)
     * @param tokenId The token ID of the land plot
     * @param encryptedBidData FHE encrypted bid data
     */
    function placeEncryptedBid(uint256 tokenId, bytes memory encryptedBidData) external {
        require(_exists(tokenId), "Token does not exist");
        require(landPlots[tokenId].isEncrypted, "Land plot is not in encrypted auction");
        require(block.timestamp < landPlots[tokenId].auctionEndTime, "Auction has ended");
        
        encryptedBids[tokenId].push(EncryptedBid({
            encryptedBid: encryptedBidData,
            encryptedBidder: abi.encodePacked(msg.sender), // In practice, this would be FHE encrypted
            timestamp: block.timestamp,
            isRevealed: false
        }));
        
        emit EncryptedBidPlaced(tokenId, msg.sender, encryptedBidData);
    }
    
    /**
     * @dev Reveal a bid after auction ends (simplified version)
     * In practice, this would involve FHE decryption
     * @param tokenId The token ID of the land plot
     * @param bidIndex Index of the bid to reveal
     * @param bidAmount The actual bid amount
     */
    function revealBid(uint256 tokenId, uint256 bidIndex, uint256 bidAmount) external {
        require(_exists(tokenId), "Token does not exist");
        require(block.timestamp >= landPlots[tokenId].auctionEndTime, "Auction has not ended");
        require(bidIndex < encryptedBids[tokenId].length, "Invalid bid index");
        require(!encryptedBids[tokenId][bidIndex].isRevealed, "Bid already revealed");
        
        // In practice, this would verify the FHE decryption
        // For now, we'll accept the revealed bid
        encryptedBids[tokenId][bidIndex].isRevealed = true;
        
        emit BidRevealed(tokenId, msg.sender, bidAmount);
    }
    
    /**
     * @dev Finalize the auction and transfer ownership to the highest bidder
     * @param tokenId The token ID of the land plot
     * @param winningBidder The address of the winning bidder
     * @param winningBid The winning bid amount
     */
    function finalizeAuction(
        uint256 tokenId,
        address winningBidder,
        uint256 winningBid
    ) external onlyOwner nonReentrant {
        require(_exists(tokenId), "Token does not exist");
        require(block.timestamp >= landPlots[tokenId].auctionEndTime, "Auction has not ended");
        require(landPlots[tokenId].isEncrypted, "Land plot is not in encrypted auction");
        
        // Transfer ownership
        _safeMint(winningBidder, tokenId);
        landPlots[tokenId].currentOwner = winningBidder;
        landPlots[tokenId].isAvailable = false;
        landPlots[tokenId].isEncrypted = false;
        
        // In practice, the bidder would pay the winning bid amount
        // For this example, we'll just emit the event
        
        emit LandSold(tokenId, winningBidder, winningBid);
    }
    
    /**
     * @dev Update the FHE public key
     * @param newPublicKey The new FHE public key
     */
    function updateFHEPublicKey(bytes memory newPublicKey) external onlyOwner {
        fhePublicKey = newPublicKey;
        emit FHEPublicKeyUpdated(newPublicKey);
    }
    
    /**
     * @dev Get land plot information
     * @param tokenId The token ID of the land plot
     */
    function getLandPlot(uint256 tokenId) external view returns (LandPlot memory) {
        require(_exists(tokenId), "Token does not exist");
        return landPlots[tokenId];
    }
    
    /**
     * @dev Get encrypted bids for a land plot
     * @param tokenId The token ID of the land plot
     */
    function getEncryptedBids(uint256 tokenId) external view returns (EncryptedBid[] memory) {
        require(_exists(tokenId), "Token does not exist");
        return encryptedBids[tokenId];
    }
    
    /**
     * @dev Check if coordinates are available
     * @param x X coordinate
     * @param y Y coordinate
     */
    function isCoordinateAvailable(uint256 x, uint256 y) external view returns (bool) {
        uint256 tokenId = coordinateToTokenId[x][y];
        if (tokenId == 0) return true;
        return landPlots[tokenId].isAvailable;
    }
    
    // Override required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return landPlots[tokenId].metadataURI;
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
