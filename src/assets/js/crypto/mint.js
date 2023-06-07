import { getProofFor, whitelistCheck, allocated } from "./whitelist.js";
import { NFT_CONTRACT, ABI, CHAIN_ID } from "./config.js";
import { ethers } from "ethers";
import { authenticate } from "./auth.js";
import { setMintText } from "./html.js";

const getAmount = () => {
  const a1 = document.getElementById("mint-amount");
  const a2 = document.getElementById("mint-amount-modal");
  if (a1) return parseInt(a1.innerText);
  else if (a2) return parseInt(a2.innerText);
};

export const minter = async (isWhitelist = false) => {
  const { contract, provider } = await getContract();
  const user = await authenticate();
  const amount = getAmount();
  const reason = ["Your tranaction is expected to fail because:\n"];

  if (
    CHAIN_ID !=
    (await window.ethereum.request({
      method: "eth_chainId",
    }))
  ) {
    reason.push(`- Your wallet is connected to the wrong network`);
  } else {
    setMintText("GENERATING TXN...");
    const {
      pricePublic,
      priceWhitelist,
      maxSupply,
      totalSupply,
      isMinting,
      isWhitelistOpen,
    } = await nftRead(contract);
    const price = isWhitelist ? priceWhitelist : pricePublic;

    if (!user) {
      reason.push("- Your wallet is not connected");
    } else {
      const balance = await provider.getBalance(user);
      if (amount === 0) reason.push("- You are trying to mint 0 tokens");
      if (totalSupply + BigInt(amount) > maxSupply)
        reason.push(
          `- Minting x${amount} will exceed the max supply (${totalSupply}/${maxSupply})`
        );
      if (balance < price * BigInt(amount))
        reason.push(
          `- You do not have enough ETH to mint x${amount}\n\tPrice: ${ethers.formatEther(
            price
          )}\n\tBalance: ${ethers.formatEther(balance)}`
        );
      if (!isWhitelist) {
        if (!isMinting) reason.push("- Public minting is not active");
      } else {
        if (!isWhitelistOpen) reason.push("- Whitelist minting is not active");
        if (!whitelistCheck(user))
          reason.push("- You are not on the whitelist");
        const usedMints = await contract.whitelistMints(user);
        if (usedMints + BigInt(amount) > BigInt(allocated(user)))
          reason.push(
            `- Minting x${amount} will exceed your whitelist claims (${usedMints}/${allocated(
              user
            )})`
          );
      }
    }
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
  var txn;
  try {
    setMintText("CHECK WALLET");
    if (!isWhitelist) {
      txn = await contract.mintTokensPublic(amount, {
        value: (await contract.priceWeiPublic()) * BigInt(amount),
      });
      setMintText("PENDING...");
    } else {
      const proof = getProofFor(user);
      txn = await contract.mintTokensWhitelist(proof, allocated(user), amount, {
        value: (await contract.priceWeiWhitelist()) * BigInt(amount),
      });
      setMintText("PENDING...");
    }
    try {
      await txn.wait();
    } catch (error) {
      console.log(
        "Failed to find txn receipt, this does not mean your txn failed"
      );
    }
    console.log("Transaction successful!");
    setMintText("SUCCESS");
  } catch (error) {
    console.log("Failed to transact", error);
  }
  setMintText("MINT NOW");
};

const nftRead = async (contract) => {
  return {
    pricePublic: await contract.priceWeiPublic(),
    priceWhitelist: await contract.priceWeiWhitelist(),
    maxSupply: await contract.MAX_SUPPLY(),
    totalSupply: await contract.totalSupply(),
    isMinting: await contract.isMinting(),
    isWhitelistOpen: await contract.isWhitelistOpen(),
  };
};

const getContract = async () => {
  if (!window.ethereum) return { contract: null, provider: null };
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(NFT_CONTRACT, ABI, signer);
  return { contract, provider };
};
