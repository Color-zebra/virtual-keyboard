import KeyFactory from './keyFactory.js';

class Key extends KeyFactory {
  constructor(keyCode, rus, eng, rusShifted, engShifted, currLang) {
    super();
    this.keyCode = keyCode;
    this.ru = rus;
    this.en = eng;
    this.ruShifted = rusShifted;
    this.enShifted = engShifted;
    this.currLang = currLang;
    this.keyElem = this.createKeyElem('div', ['key', this.keyCode], this.keyCode, this[this.currLang]);
    this.keyValue = this.keyElem.querySelector('.back');
  }

  showru() {
    this.keyValue.innerText = this.ru;
  }

  showen() {
    this.keyValue.innerText = this.en;
  }

  showruShifted() {
    this.keyValue.innerText = this.ruShifted;
  }

  showenShifted() {
    this.keyValue.innerText = this.enShifted;
  }
}

export default Key;
