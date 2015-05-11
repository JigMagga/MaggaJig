// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined') {
  // We are in node. Require modules.
  __base = __dirname + '/../src/';
  assert = require("assert");
  
  isBrowser = false;
} else {
  // We are in the browser. Set up variables like above using served js files.

  // num and sinon already exported globally in the browser.
  isBrowser = true;
}