/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(HTMLElements) {
    this.elements = HTMLElements;
  }

  html (val = null) {
    if (val) {
      this.elements.reverse().forEach((el) => {
        el.innerHTML = val;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty () {
    this.elements.reverse().forEach((el) => {
      el.innerHTML = "";
    });
  }

  append (content) {
    if (content instanceof DOMNodeCollection) {
      content.remove();
    }
    this.elements.reverse().forEach((el) => {
      if (content instanceof DOMNodeCollection) {
        content.elements.forEach((appendEl) => {
          el.innerHTML += appendEl.outerHTML;
        });
      } else if (content instanceof HTMLElement) {
        el.innerHTML += content.outerHTML;
      } else {
        el.innerHTML += content;
      }
    });
  }

  attr (attributeName, value = undefined) {
    if (value === undefined) {
      return this.elements[0].getAttribute(attributeName);
    } else if (value === null) {
      this.elements.reverse().forEach((el) => {
        el.removeAttribute(attributeName);
      });
    } else {
      this.elements.reverse().forEach((el) => {
        el.setAttribute(attributeName, value);
      });
    }
  }

  addClass (newClass) {
    this.elements.reverse().forEach((el) => {
      el.className += ` ${newClass}`;
    });
  }

  removeClass (oldClass) {
    this.elements.reverse().forEach((el) => {
      el.className = el.className.replace(` ${oldClass}`, '');
      el.className = el.className.replace(oldClass, '');
    });
  }

  children () {
    let newArr = [];
    this.elements.reverse().forEach((el) => {
      newArr = newArr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(newArr);
  }

  parent () {
    let parentArr = [];

    this.elements.forEach((el) => {
      if (!parentArr.includes(el.parentNode)) {
        parentArr.push(el.parentNode);
      }
    });

    return new DOMNodeCollection(parentArr);
  }

  find (selector) {
    let results = new Set();
    if (typeof selector !== 'string') {
      selector = selector[0].tagName;
    }
    this.elements.reverse().forEach((el) => {
      let elements = el.querySelectorAll(selector);
      results = new Set([...results, ...elements]);
    });
    return new DOMNodeCollection(Array.from(results));
  }

  remove () {
    this.elements.reverse().forEach((el) => {
      let parent = el.parentNode;
      parent.removeChild(el);
    });
  }

  on (eventType, callback) {
    this.elements.reverse().forEach((el) => {
      el.addEventListener(eventType, callback);
    });
  }

  off (eventType) {
    this.elements.reverse().forEach((el) => {
      el.removeEventListener(eventType);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);