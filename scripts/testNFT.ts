import { network } from "hardhat";
import { mintProductNFT, getNFTOwner } from "../services/productNFTService";

async function main() {
  const { ethers } = await network.connect({ network: "localhost" });
  const [owner] = await ethers.getSigners();

  const PRODUCT_NFT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  console.log("Using signer:", owner.address);

  const metadataURI = "ipfs://TEST_BATCH_001";

  const tokenId = await mintProductNFT(
    ethers,
    PRODUCT_NFT_ADDRESS,
    owner,
    metadataURI
  );

  console.log("Minted tokenId:", tokenId.toString());

  const nftOwner = await getNFTOwner(
    ethers,
    PRODUCT_NFT_ADDRESS,
    tokenId
  );

  console.log("Owner of token", tokenId.toString(), "is:", nftOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
