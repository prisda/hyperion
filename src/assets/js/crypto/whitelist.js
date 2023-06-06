import { ethers } from "ethers";
import "merkletreejs";

export const whitelist = {
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 2,
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906": 1,
  /// random for proof size increase
  //   "0x7B5F1C7B7B838AE9c7C1778C60Ce47602e61232d": 1,
  //   "0x9Cd8392f7bBB9439708B7923C2D11e9F4Fb7C895": 1,
  //   "0xC2F3b3F8914c556b3e7E2c418Bc1487A1bBd3096": 1,
  //   "0xA9E675A7aF220D8F1625E5F20B8427a464E05E9d": 1,
  //   "0x6B8b98D3C71D9717FB395c7C1c2F4076A5F72efA": 1,
};

export const makeMerkleTree = () => {
  // Convert each pair to a buffer hash
  const hashes = Object.entries(whitelist).map(([address, number]) => {
    const leaf = ethers.keccak256(
      ethers.solidityPacked(
        ["address", "uint256"],
        [address, whitelist[address]]
      )
    );
    return leaf;
  });

  // Create the Merkle tree
  const tree = new MerkleTree(hashes, ethers.keccak256, {
    sortPairs: true,
  });
  // Get the Merkle root
  const root = tree.getRoot().toString("hex");
  console.log("tree", tree.toString());
  return { tree, root };
};

export const getProofFor = async (address, tree) => {
  // Create the leaf using the address and the corresponding allocations
  const leaf = ethers.keccak256(
    ethers.solidityPacked(
      ["address", "uint256"],
      [address.address, whitelist[address.address]]
    )
  );
  // Generate the proof for this leaf from the Merkle tree
  const proof = tree.getHexProof(leaf);
  return proof;
};
