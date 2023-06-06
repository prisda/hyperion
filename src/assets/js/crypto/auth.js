import { CHAIN_ID, networks } from "./config.js";
import { mintWhitelist, mintPublic } from "./mint.js";
import {
  initHTML,
  setWalletText,
  btn1,
  btn2,
  mintBtn1,
  mintBtn2,
} from "./html.js";

var loggedIn = false;

const compress = (str) => {
  return str.slice(0, 6) + "..." + str.slice(-4);
};

/// User logging
export const logUser = async () => {
  loggedIn ? logOut() : await logIn();
};

const logIn = async () => {
  const user = await authenticate();

  if (user) {
    /// change text
    setWalletText(compress(user));
    loggedIn = true;
  } else {
    /// change text
    console.log("fail");
    loggedIn = false;
  }
};

const logOut = () => {
  setWalletText("CONNECT WALLET");
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

window.ethereum.on("accountsChanged", handleAccountChange);
window.ethereum.on("networkChanged", handleNetworkChange);

/// Auto connect if already connected
if (
  window.ethereum &&
  (window.location.pathname == "/index.html" || window.location.pathname == "/")
) {
  logIn().then();
}

/// Login/logout/mint buttons
initHTML();
