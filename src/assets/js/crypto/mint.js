import * as whitelist from "./whitelist.js";
import { NFT_CONTRACT, ABI } from "./config.js";
import { ethers } from "ethers";
import { authenticate } from "./auth.js";
import { setMintText } from "./html.js";

const getAmount = () => {
  const a1 = document.getElementById("mint-amount");
  const a2 = document.getElementById("mint-amount-modal");
  if (a1) return parseInt(a1.innerText);
  else if (a2) return parseInt(a2.innerText);
};

export const mintWhitelist = async () => {
  const amount = getAmount();
  let tree = whitelist.makeMerkleTree();
  console.log("tree", tree.toString());
};

const nftRead = async (contract) => {
  return {
    price: await contract.priceWeiPublic(),
    maxSupply: await contract.MAX_SUPPLY(),
    totalSupply: await contract.totalSupply(),
    isMinting: await contract.isMinting(),
  };
};

export const mintPublic = async () => {
  const { contract, provider } = await getContract();
  const user = await authenticate();
  const amount = getAmount();
  const reason = ["Your tranaction is expected to fail because:\n"];

  setMintText("GENERATING TXN...");
  const { price, maxSupply, totalSupply, isMinting } = await nftRead(contract);
  if (!user) {
    reason.push("- Your wallet is not connected");
  } else {
    const balance = await provider.getBalance(user);
    if (amount === 0) reason.push("- You are trying to mint 0 tokens");
    if (!(await contract.isMinting()))
      reason.push("- Public minting is not active");
    if (balance < price * BigInt(amount))
      reason.push(
        `- You do not have enough ETH to mint x ${amount}\n\tPrice: ${ethers.formatEther(
          price
        )}\n\tBalance: ${ethers.formatEther(balance)}`
      );
    if (totalSupply + BigInt(amount) > maxSupply)
      reason.push(
        `- Minting x ${amount} will exceed the max supply (${totalSupply}/${maxSupply})`
      );
  }

  if (reason.length > 1) {
    setTimeout(function () {
      setMintText("EXPECTED TO FAIL");
    }, 1);
    setTimeout(function () {
      alert(reason.join("\n"));
      window.location.href = "index.html";
    }, 2);
    return;
  }

  try {
    setMintText("CHECK WALLET");
    const txn = await contract.mintTokensPublic(amount, {
      value: (await contract.priceWeiPublic()) * BigInt(amount),
    });
    setMintText("PENDING...");
    await txn.wait();
    setMintText("SUCCESS");
  } catch (error) {
    console.log("Failed to transact", error);
  }
  setMintText("MINT NOW");
};

const getContract = async () => {
  if (!window.ethereum) return { contract: null, provider: null };
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(NFT_CONTRACT, ABI, signer);
  return { contract, provider };
};
