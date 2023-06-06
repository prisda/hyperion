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
// export const NFT_CONTRACT = "0x2ef6BD080A98A9D3230A99A2923f47A3cC2f5359";
export const NFT_CONTRACT = "0x4a30D3149488eB71da9d74B9aF647Bc6724d5100";
export const ABI = require("./abi.json");
