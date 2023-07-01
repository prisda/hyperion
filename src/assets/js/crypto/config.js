/// NETWORK CONFIG
export const CHAIN_ID = "0x118"; // set to 0x144 for mainnet
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
export const ABI = require("./abi.json");
export const NFT_ADDRS = {
  1: "0x0D31a408Db010CF096578B9cE5562B878B344517",
  2: "0x4C009dcD3FF277FAD070D617B48748F43bf19ff5",
  3: "0x50376f7A7F23B5bdeFaB09C867241230c9d8a672",
};
