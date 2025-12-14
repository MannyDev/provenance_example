import { Contract, Signer } from "ethers";

export async function mintProductNFT(
  ethers: any,
  contractAddress: string,
  signer: Signer,
  metadataURI: string
): Promise<bigint> {
  const productNFT = new Contract(
    contractAddress,
    [
      "function mint(address to, string metadataURI) returns (uint256)",
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
    ],
    signer
  );

  const tx = await productNFT.mint(await signer.getAddress(), metadataURI);
  const receipt = await tx.wait();

  const transferEvent = receipt.logs.find(
    (log: any) => log.fragment?.name === "Transfer"
  );

  return transferEvent.args.tokenId;
}

export async function getNFTOwner(
  ethers: any,
  contractAddress: string,
  tokenId: bigint
): Promise<string> {
  const productNFT = new Contract(
    contractAddress,
    ["function ownerOf(uint256 tokenId) view returns (address)"],
    ethers.provider
  );

  return await productNFT.ownerOf(tokenId);
}
