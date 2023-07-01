import { logUser } from "./auth";
import { minter } from "./mint";

/// Login buttons
export const btn1 = document.getElementById("connect-btn"),
  btn2 = document.getElementById("connect-btn-mobile");

/// Mint buttons (page)
export const mintBtnPage1 = document.getElementById("mint-btn");
export const mintBtnPage2 = document.getElementById("mint-btn2");
export const mintBtnPage3 = document.getElementById("mint-btn3");
/// Mint buttons (modal)
export const mintBtnModal1 = document.getElementById("mint-btn-modal");
/// 2 & 3 if needed

/// Add login/out & mint functions
export const initHTML = () => {
  /// Login buttons
  if (btn1) btn1.addEventListener("click", () => logUser());
  if (btn2) btn2.addEventListener("click", () => logUser());
  /// Mint buttons
  if (mintBtnPage1)
    mintBtnPage1.addEventListener("click", () => minter(false, 1));
  if (mintBtnModal1)
    mintBtnModal1.addEventListener("click", () => minter(true, 1));
  /// new
  if (mintBtnPage2)
    mintBtnPage2.addEventListener("click", () => minter(false, 2));
  if (mintBtnPage3)
    mintBtnPage3.addEventListener("click", () => minter(false, 3));
};

/// Change text of login & mint buttons
export const setWalletText = (text) => {
  if (btn1.innerText) btn1.innerText = text;
  if (btn2) btn2.querySelector("span").innerText = text;
};

/// Set text of minting btns
export const setMintText = (text) => {
  /// Page buttons
  if (mintBtnPage1) mintBtnPage1.innerText = text;
  if (mintBtnPage2) mintBtnPage2.innerText = text;
  if (mintBtnPage3) mintBtnPage3.innerText = text;
  /// Modal buttons
  if (mintBtnModal1) mintBtnModal1.innerText = text;
  /// 2 & 3 if needed
};
