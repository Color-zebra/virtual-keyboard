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

  showRus() {
    this.keyElem.innerText = this.rus;
  }

  showEng() {
    this.keyElem.innerText = this.eng;
  }

  showRusShifted() {
    this.keyElem.innerText = this.rusShifted;
  }

  showEngShifted() {
    this.keyElem.innerText = this.engShifted;
  }
}

export default Key;
