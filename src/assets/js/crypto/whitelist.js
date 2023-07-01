import { ethers } from "ethers";

/// Whitelists
const whitelist = {
  "0xc17c646D6300bBff077115e10B1B7FDBe518929B": 10,
  "0xD5150c9e61ADbcA91A0F6908d5f7A5440E7E96E5": 1,
};
const whitelist2 = {
  "0xc17c646D6300bBff077115e10B1B7FDBe518929B": 10,
  "0xD5150c9e61ADbcA91A0F6908d5f7A5440E7E96E5": 1,
};
const whitelist3 = {
  "0xc17c646D6300bBff077115e10B1B7FDBe518929B": 10,
  "0xD5150c9e61ADbcA91A0F6908d5f7A5440E7E96E5": 1,
};

/// Check if user is in a whitelist
export const whitelistCheck = (address, contractNum) => {
  if (contractNum === 1)
    return whitelist.hasOwnProperty(ethers.getAddress(address));
  else if (contractNum === 2)
    return whitelist2.hasOwnProperty(ethers.getAddress(address));
  else return whitelist3.hasOwnProperty(ethers.getAddress(address));
};

/// Get how many claims a user has in a whitelist
export const allocated = (address, contractNum) => {
  let allowed;
  const fixed = ethers.getAddress(address);
  if (contractNum === 1) allowed = whitelist[ethers.getAddress(address)];
  else if (contractNum === 2) allowed = whitelist2[ethers.getAddress(address)];
  else allowed = whitelist3[ethers.getAddress(address)];
  return allowed ? allowed : 0;
};

/// Make merkle tree for a whitelist
const makeMerkleTree = (contractNum) => {
  // Convert each pair to a buffer hash
  const hashes = Object.entries(
    contractNum == 1 ? whitelist : contractNum == 2 ? whitelist2 : whitelist3
  ).map(([address, number]) => {
    const leaf = ethers.keccak256(
      ethers.solidityPacked(
        ["address", "uint256"],
        [
          address,
          contractNum == 1
            ? whitelist[address]
            : contractNum == 2
            ? whitelist2[address]
            : whitelist3[address],
        ]
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

/// Get the proof for a user in a whitelist
export const getProofFor = (address, contractNum) => {
  // Create tree
  const tree = makeMerkleTree(contractNum);
  // Create the leaf using the address and the corresponding allocations
  const leaf = ethers.keccak256(
    ethers.solidityPacked(
      ["address", "uint256"],
      [
        ethers.getAddress(address),
        contractNum == 1
          ? whitelist[ethers.getAddress(address)]
          : contractNum == 2
          ? whitelist2[ethers.getAddress(address)]
          : whitelist3[ethers.getAddress(address)],
      ]
    )
  );
  // Generate the proof for this leaf from the Merkle tree
  const proof = tree.tree.getHexProof(leaf);
  return proof;
};
