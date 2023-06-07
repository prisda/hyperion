/// NETWORK CONFIG
export const CHAIN_ID = "0x118";
export const networks = {
  "0x118": {
    chainId: "0x118",
    chainName: "zkSync Era Testnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.era.zksync.dev"],
    blockExplorerUrls: ["https://goerli.explorer.zksync.io"],
  },

  "0x144": {
    chainId: "0x144",
    chainName: "zkSync Era Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.era.zksync.io"],
    blockExplorerUrls: ["https://explorer.zksync.io"],
  },
};
/// NFT CONFIG
export const NFT_CONTRACT = "0x0D31a408Db010CF096578B9cE5562B878B344517";
export const ABI = require("./abi.json");
