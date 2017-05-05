const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(selector) {
  let nodeArray;
  if (selector instanceof HTMLElement) {
    nodeArray = [selector];
  } else if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
  } else {
    let nodeList = document.querySelectorAll(selector);
    nodeArray = Array.from(nodeList);

  }
  return new DOMNodeCollection(nodeArray);
};
