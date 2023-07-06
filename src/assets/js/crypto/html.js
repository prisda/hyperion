import { logUser } from "./auth";
import { minter } from "./mint";

/// Login buttons
export const btn1 = document.getElementById("connect-btn"),
  btn2 = document.getElementById("connect-btn-mobile"); /// connect btn and mobile mobile btn
/// Drop down (desktop)
export const dropDown = document.getElementById("bal-dropdown");
export const dropdownWrapper = document.getElementById("dropdown-wrapper");
export const ethBalBtn = document.getElementById("eth-bal-btn");
export const usdtBalBtn = document.getElementById("usdt-bal-btn");
// export const disconnectBtn = document.getElementById("disconnect-btn");
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
  if (dropDown) dropDown.style.display = "none";
  if (dropdownWrapper) {
    dropdownWrapper.addEventListener("mouseover", () => {
      dropDown.style.display = "block";
    });
    dropdownWrapper.addEventListener("mouseout", () => {
      console.log("out");
      dropDown.style.display = "none";
    });
    dropdownWrapper.addEventListener("click", () => {
      logUser();
    });
  }
  /// mobile button
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

export const setDropDownText = (ethBal, usdtBal, disconnectTxt) => {
  if (ethBalBtn) ethBalBtn.innerText = ethBal;
  if (usdtBalBtn) usdtBalBtn.innerText = usdtBal;
  // if (disconnectBtn) disconnectBtn.innerText = disconnectTxt;
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
