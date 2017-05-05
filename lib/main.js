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

window.$l.extend = function extend(mutateObj, ...otherObjs) {
  otherObjs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      mutateObj[key] = obj[key];
    });
  });
  return mutateObj;
};

window.$l.ajax = (options) => {
  let defaults = {
    success: () => console.log("undefined success"),
    error: () => console.log("undefined error"),
    url: document.URL,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  window.$l.extend(defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.open(defaults.method, defaults.url);

  xhr.onload = defaults.success;

  xhr.send(defaults.data);
};
