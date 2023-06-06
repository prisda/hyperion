import { logUser } from "./auth";
import { minter } from "./mint";

/// Login buttons
export const btn1 = document.getElementById("connect-btn"),
  btn2 = document.getElementById("connect-btn-mobile");

/// Mint buttons
export const mintBtn1 = document.getElementById("mint-btn"),
  mintBtn2 = document.getElementById("mint-btn-modal");

/// Add login/out & mint functions
export const initHTML = () => {
  /// Login buttons
  if (btn1) btn1.addEventListener("click", () => logUser());
  if (btn2) btn2.addEventListener("click", () => logUser());
  /// Mint buttons
  if (mintBtn1) mintBtn1.addEventListener("click", () => minter(false));
  if (mintBtn2) mintBtn2.addEventListener("click", () => minter(true));
};

/// Change text of login & mint buttons
export const setWalletText = (text) => {
  if (btn1.innerText) btn1.innerText = text;
  if (btn2) btn2.querySelector("span").innerText = text;
};

export const setMintText = (text) => {
  if (mintBtn1) mintBtn1.innerText = text;
  if (mintBtn2) mintBtn2.innerText = text;
};
