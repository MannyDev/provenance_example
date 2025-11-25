import {
  mint,
  getNFTOwner,
  getNFTMetadataURI,
  getNFTsByOwner
} from "../services/productNFTService";

import { ethers } from "ethers";

async function main() {
  // connect to local node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner(0);
  const ownerAddress = await signer.getAddress();

  // mint NFT to ownerAddress
  await mint(ownerAddress, "ipfs://QmExampleCidForMetadata");

  console.log("Owner:", await getNFTOwner(1));
  console.log("Metadata:", await getNFTMetadataURI(1));

  console.log(
    "NFTs owned by ownerAddress:",
    await getNFTsByOwner(ownerAddress)
  );
}

main();
