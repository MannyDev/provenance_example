import { Signer } from "ethers";

export async function mintProductNFT(
  ethers: any,
  contractAddress: string,
  signer: Signer,
  tokenId: bigint
) {
  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const nft = ProductNFT.attach(contractAddress).connect(signer);

  const tx = await nft.mint(await signer.getAddress(), tokenId);
  await tx.wait();

  console.log("✔ NFT minted for product", await signer.getAddress());
}

export async function getNFTOwner(
  ethers: any,
  contractAddress: string,
  tokenId: bigint
): Promise<string | null> {
  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const nft = ProductNFT.attach(contractAddress);

  try {
    return await nft.ownerOf(tokenId);
  } catch {
    return null;
  }
}
