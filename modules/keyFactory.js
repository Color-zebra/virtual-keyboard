class KeyFactory {
  constructor() {
    this.createKeyElem = function createElem(tag, classNames, id, content) {
      const elem = document.createElement(tag);
      const elemBack = document.createElement(tag);
      elemBack.classList.add('back');
      elem.append(elemBack);
      classNames.forEach((item) => elem.classList.add(item));
      if (id) elem.setAttribute('id', id);
      if (!content) return elem;
      if (typeof content === 'string') {
        elemBack.innerText = content;
      } else {
        elemBack.append(content);
      }

      return elem;
    };
  }
}

export default KeyFactory;
