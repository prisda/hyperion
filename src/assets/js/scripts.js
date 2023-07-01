/** You can import all css in js, it will injecting a `<style>` tag
 * e.g: import '../scss/styles.scss'
 * But you should change the config in webpack.config.js
 * You can call me if you need help about this
 */

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
// Import jQuery
import * as $ from "jquery";

import * as setup from "./crypto/html.js";

$(document).ready(async function () {
  setup.initHTML();
});
