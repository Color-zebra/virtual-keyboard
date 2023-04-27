class KeyFactory {
  constructor() {
    this.createKeyElem = function createElem(tag, classNames, id, content) {
      const elem = document.createElement(tag);
      classNames.forEach((item) => elem.classList.add(item));
      if (id) elem.setAttribute('id', id);
      if (!content) return elem;
      if (typeof content === 'string') {
        elem.innerText = content;
      } else {
        elem.append(content);
      }

      return elem;
    };
  }
}

export default KeyFactory;
