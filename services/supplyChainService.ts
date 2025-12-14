import { Signer } from "ethers";

export async function recordSupplyChainEvent(
  ethers: any,
  contractAddress: string,
  signer: Signer,
  tokenId: bigint,
  description: string
) {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = SupplyChain.attach(contractAddress).connect(signer);

  const tx = await supplyChain.addEvent(tokenId, description);
  await tx.wait();

  console.log("✔ Supply chain event recorded:", description);
}

export async function getProductHistory(
  ethers: any,
  contractAddress: string,
  tokenId: bigint
) {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = SupplyChain.attach(contractAddress);

  return await supplyChain.getEvents(tokenId);
}
