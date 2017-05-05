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
