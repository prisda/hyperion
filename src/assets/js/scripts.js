/** You can import all css in js, it will injecting a `<style>` tag
 * e.g: import '../scss/styles.scss'
 * But you should change the config in webpack.config.js
 * You can call me if you need help about this
 */

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Import jQuery
import * as $ from "jquery";

import * as auth from "./crypto/auth";
import * as nft from "./crypto/mint";
import * as whitelist from "./crypto/whitelist";

/// Crypto stuff below
let loggedIn = false; /// logged in state
let user = ""; /// address

$(document).ready(async function () {
  console.log("hello world");

  //   let signIn = auth.logIn();
  //   console.log("now", loggedIn);
  //   loggedIn = crypto.f();
  //   console.log("then", loggedIn);
  await nft.mintWhitelist(0);
});
