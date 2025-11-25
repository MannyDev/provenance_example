import { network } from "hardhat";

async function main() {
  
  const { ethers } = await network.connect({ network: "hardhatOp" });

  // Deploy ProductNFT contract
  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const productNFT = await ProductNFT.deploy();
  await productNFT.waitForDeployment();
  console.log("ProductNFT deployed to:", await productNFT.getAddress());

  // Deploy SupplyChain contract
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplychain = await SupplyChain.deploy(productNFT.target);
  await supplychain.waitForDeployment();
  console.log("SupplyChain deployed to:", await supplychain.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});