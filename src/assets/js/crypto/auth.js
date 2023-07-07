import { CHAIN_ID, networks, ERC20ABI, USDT_ADDR } from "./config.js";
import { setWalletText, setDropDownText } from "./html.js";
import { ethers } from "ethers";

var loggedIn = false;

const compress = (str) => {
  return str.slice(0, 6) + "..." + str.slice(-4);
};

/// User logging
export const logUser = async () => {
  loggedIn ? logOut() : await logIn();
};

const fetchBalances = async () => {
  let ethBalance = 0,
    usdtBalance = 0;

  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const usdtContract = new ethers.Contract(USDT_ADDR, ERC20ABI, signer);
    try {
      ethBalance = await provider.getBalance(signer.getAddress());
    } catch (error) {
      console.log("Error fetching ETH balance", error);
    }

    try {
      await usdtContract.balanceOf(signer.getAddress());
    } catch (error) {
      console.log("Error fetching USDT balance", error);
    }
  }

  return {
    ethBalance: parseFloat(ethers.formatEther(ethBalance)).toFixed(3),
    usdtBalance: parseFloat(ethers.formatUnits(usdtBalance, 6)).toFixed(3),
  };
};

const logIn = async () => {
  const user = await authenticate();

  if (user) {
    /// change text
    setWalletText(compress(user));
    /// fetch balances
    const { ethBalance, usdtBalance } = await fetchBalances();
    setDropDownText(ethBalance + " ETH", usdtBalance + " USDT", "DISCONNECT");
    loggedIn = true;
  } else {
    /// change text
    loggedIn = false;
  }
};

const logOut = () => {
  setWalletText("CONNECT WALLET");
  setDropDownText("... ETH", "... USDT", "CONNECT");

  loggedIn = false;
};

export const authenticate = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if ((await addNetwork()) && (await switchNetwork())) return accounts[0];
      else return false;
    } catch (error) {
      console.log("Failed to connect to wallet", error);
      return false;
    }
  }
};

/// Network and account changes
const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN_ID }],
    });
    return true;
  } catch (error) {
    console.error("Failed to switch network:", error);
    return false;
  }
};

const addNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networks[CHAIN_ID]],
    });
    return true;
  } catch (error) {
    console.error("Failed to add network", error);
    return false;
  }
};

const handleAccountChange = (accounts) => {
  if (accounts.length === 0) logOut();
  else setWalletText(compress(accounts[0]));
};

const handleNetworkChange = async (networkId) => {
  if (networkId != CHAIN_ID) {
    setWalletText("WRONG NETWORK");
    (await addNetwork()) && (await switchNetwork()) ? await logIn() : logOut();
  }
};
if (window.ethereum) {
  window.ethereum.on("accountsChanged", handleAccountChange);
  window.ethereum.on("networkChanged", handleNetworkChange);
}

/// Auto connect if already connected
if (window.ethereum && window.location.pathname == "/index.html") {
  logIn().then();
}
