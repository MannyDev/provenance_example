import { Contract, Signer } from "ethers";

export async function registerBatch(
  signer: Signer,
  supplyChainAddress: string,
  tokenId: bigint
) {
  const supplyChain = new Contract(
    supplyChainAddress,
    ["function registerBatch(uint256 tokenId)"],
    signer
  );

  const tx = await supplyChain.registerBatch(tokenId);
  await tx.wait();
}
