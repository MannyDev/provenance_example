import { network } from "hardhat";
import {
  mintProductNFT,
  getNFTOwner,
} from "../services/productNFTService";

async function main() {
  // Connect explicitly to localhost
  const { ethers } = await network.connect({ network: "localhost" });

  const [owner] = await ethers.getSigners();

  const PRODUCT_NFT_ADDRESS = "PASTE_DEPLOYED_PRODUCTNFT_ADDRESS_HERE";

  const tokenId = 0n;

  console.log("Using signer:", owner.address);

  // Mint NFT
  await mintProductNFT(
    ethers,
    PRODUCT_NFT_ADDRESS,
    owner,
    tokenId
  );

  // Query owner
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
