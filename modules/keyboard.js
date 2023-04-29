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
    this.nonHandledCodes = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    this.keys = {};
    this.pressed = [];
  }

  getLang() {
    const lsLang = localStorage.getItem('lang');
    this.lang = lsLang || 'en';
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', this.lang);
  }

  changeLang() {
    const newLang = this.lang === 'en' ? 'ru' : 'en';
    this.setLang(newLang);
    this.updateKeyboard();
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
      this.keys[code] = currKey;
      input.append(this.keys[code].keyElem);
    });
    this.hydrateKeyboard();
  }

  updateKeyboard() {
    Object.keys(this.keys).forEach((keyName) => {
      this.keys[keyName].keyValue.innerText = this.keys[keyName][this.lang];
    });
  }

  checkPressed() {
    if ((this.pressed.includes('ControlLeft') || this.pressed.includes('ControlRight')) && (this.pressed.includes('ShiftRight') || this.pressed.includes('ShiftLeft'))) {
      this.changeLang();
    }
  }

  hydrateKeyboard() {
    const handleKeyDown = (e) => {
      if (this.nonHandledCodes.includes(e.code)) return;
      e.preventDefault();
      const keyEl = this.keys[e.code].keyElem;
      keyEl.classList.add('active');
      if (!this.pressed.includes(e.code)) {
        this.pressed.push(e.code);
      }
      if (e.repeat === false) {
        this.checkPressed();
      }
    };

    const handleKeyUp = (e) => {
      const keyEl = this.keys[e.code].keyElem;
      keyEl.classList.remove('active');
      this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== e.code);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }
}

export default Keyboard;
