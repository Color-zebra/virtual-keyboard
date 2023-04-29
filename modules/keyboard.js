import Key from './key.js';
import KeyFactory from './keyFactory.js';

class Keyboard extends KeyFactory {
  constructor() {
    super();
    this.lang = 'en';
    this.isShifted = false;
    this.ruLabel = 'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab й ц у к е н г ш щ з х ъ \\ Del CapsLock ф ы в а п р о л д ж э Enter Shift я ч с м и т ь б ю . \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.enLabel = '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab q w e r t y u i o p { } \\ Del CapsLock a s d f g h j k l : \' Enter Shift z x c v b n m , . / \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.ruShifted = 'Ё ! " № ; % : ? * ( ) - = Backspace Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del CapsLock Ф Ы В А П Р О Л Д Ж Э Enter Shift Я Ч С М И Т Ь Б Ю , \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.enShifted = '~ ! @ # $ % ^ & * ( ) _ + Backspace Tab Q W E R T Y U I O P [ ] \\ Del CapsLock A S D F G H J K L ; " Enter Shift Z X C V B N M < > ? \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
    this.letterKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash'];
    this.keys = [];
  }

  getLang() {
    const lsLang = localStorage.getItem('lang');
    this.lang = lsLang || 'en';
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', this.lang);
  }

  initKeyboard() {
    const input = document.getElementById('input');
    this.getLang();
    this.keyCodes.forEach((code, index) => {
      const currKey = new Key(
        code,
        this.ruLabel[index],
        this.enLabel[index],
        this.ruShifted[index],
        this.enShifted[index],
        this.lang,
      );
      this.keys.push(currKey);
      input.append(this.keys[this.keys.length - 1].keyElem);
    });
  }
}

export default Keyboard;
