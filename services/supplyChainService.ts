import { ethers } from "ethers";

// --- 1. Configure provider & signer ---
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Use account[0] on the local Hardhat node
const signer = await provider.getSigner(0);

// --- 2. Load contract ABI ---
import SupplyChainJson from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

// --- 3. Set deployed contract address ---
// Replace with the address printed after deployment
const SUPPLYCHAIN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// --- 4. Create a contract instance ---
const supplyChain = new ethers.Contract(
  SUPPLYCHAIN_ADDRESS,
  SupplyChainJson.abi,
  signer
);

// =========================
//    EXPORTED FUNCTIONS
// =========================

/**
 * Register a new product into the supply chain.
 */
export async function registerProduct(
  productId: number,
  metadataCID: string
) {
  const tx = await supplyChain.registerProduct(productId, metadataCID);
  await tx.wait();
  console.log(`✔ Product ${productId} registered.`);
}

/**
 * Transfer product ownership to another wallet.
 */
export async function transferProduct(
  productId: number,
  newOwner: string
) {
  const tx = await supplyChain.transferProduct(productId, newOwner);
  await tx.wait();
  console.log(`✔ Product ${productId} transferred to: ${newOwner}`);
}

/**
 * Update product status (ex: Created→InTransit→Delivered).
 */
export async function updateProductStatus(
  productId: number,
  newStatus: string
) {
  const tx = await supplyChain.updateStatus(productId, newStatus);
  await tx.wait();
  console.log(`✔ Status for product ${productId} updated to: ${newStatus}`);
}

/**
 * Reads full product metadata stored on-chain.
 */
export async function getProduct(productId: number) {
  const product = await supplyChain.getProduct(productId);
  return product;
}

/**
 * Returns the full event-based history of a product.
 */
export async function getProductHistory(productId: number) {
  const filter = supplyChain.filters.ProductEvent(productId);
  const events = await supplyChain.queryFilter(filter);
  return events.map((e) => ({
    event: e.eventName,
    args: e.args,
    block: e.blockNumber,
  }));
}
