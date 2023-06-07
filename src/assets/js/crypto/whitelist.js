import { ethers } from "ethers";

const whitelist = {
  "0xc17c646D6300bBff077115e10B1B7FDBe518929B": 10,
  "0xD5150c9e61ADbcA91A0F6908d5f7A5440E7E96E5": 1,
};

export const whitelistCheck = (address) => {
  return whitelist.hasOwnProperty(ethers.getAddress(address));
};

export const allocated = (address) => {
  const allowed = whitelist[ethers.getAddress(address)];
  return allowed ? allowed : 0;
};

const makeMerkleTree = () => {
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
  const tree = new window.MerkleTree(hashes, ethers.keccak256, {
    sortPairs: true,
  });
  // Get the Merkle root
  const root = tree.getRoot().toString("hex");
  return { tree, root };
};

export const getProofFor = (address) => {
  // Create tree
  const tree = makeMerkleTree();
  // Create the leaf using the address and the corresponding allocations
  const leaf = ethers.keccak256(
    ethers.solidityPacked(
      ["address", "uint256"],
      [ethers.getAddress(address), whitelist[ethers.getAddress(address)]]
    )
  );
  // Generate the proof for this leaf from the Merkle tree
  const proof = tree.tree.getHexProof(leaf);
  return proof;
};
