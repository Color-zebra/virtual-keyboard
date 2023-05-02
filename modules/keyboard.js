import Key from './key.js';
import SpecialKeysFunc from './specKeysFunc.js';

class Keyboard extends SpecialKeysFunc {
  constructor() {
    super();
    this.lang = 'en';
    this.isShifted = false;
    this.isShiftedByMouse = false;
    this.isCapsed = false;
    this.ruLabel = 'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab й ц у к е н г ш щ з х ъ \\ Del CapsLock ф ы в а п р о л д ж э Enter Shift я ч с м и т ь б ю . \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.enLabel = '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab q w e r t y u i o p { } \\ Del CapsLock a s d f g h j k l : \' Enter Shift z x c v b n m , . / \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.ruShifted = 'Ё ! " № ; % : ? * ( ) - = Backspace Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del CapsLock Ф Ы В А П Р О Л Д Ж Э Enter Shift Я Ч С М И Т Ь Б Ю , \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.enShifted = '~ ! @ # $ % ^ & * ( ) _ + Backspace Tab Q W E R T Y U I O P [ ] \\ Del CapsLock A S D F G H J K L ; " Enter Shift Z X C V B N M < > ? \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
    this.keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
    this.letterKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash'];
    this.numbersKeys = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];
    this.nonHandledCodes = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    this.keys = {};
    this.pressed = [];
    this.output = null;
    this.input = null;
    this.handleLetterKey = (keyObj) => {
      const startPos = this.output.selectionStart;
      const finishPos = this.output.selectionEnd;
      this.output.value = this.output.value.slice(0, startPos)
                          + keyObj.keyValue.innerText
                          + this.output.value.slice(finishPos);
      this.output.selectionStart = startPos + 1;
      this.output.selectionEnd = startPos + 1;
    };
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
    this.checkShift();
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
    this.output = document.getElementById('output');
    this.input = document.getElementById('input');
    this.hydrateKeyboard();
    this.output.focus();
    this.updateKeyboard();
  }

  updateKeyboard() {
    if ((this.isCapsed && !this.isShifted) || (!this.isCapsed && this.isShifted)) {
      Object.keys(this.keys).forEach((keyName) => {
        this.keys[keyName].keyValue.innerText = this.keys[keyName][`${this.lang}Shifted`];
      });
    } else {
      Object.keys(this.keys).forEach((keyName) => {
        this.keys[keyName].keyValue.innerText = this.keys[keyName][this.lang];
      });
    }
    if ((this.isCapsed && !this.isShifted)) {
      this.numbersKeys.forEach((number) => {
        this.keys[number].showru();
      });
    }
    if ((this.isCapsed && this.isShifted)) {
      this.numbersKeys.forEach((number) => {
        this.keys[number][`show${this.lang}Shifted`]();
      });
    }
    this.checkShift();
  }

  checkPressed() {
    if ((this.pressed.includes('ControlLeft') || this.pressed.includes('ControlRight')) && (this.pressed.includes('ShiftRight') || this.pressed.includes('ShiftLeft'))) {
      this.changeLang();
    }
  }

  checkShift() {
    if (this.isShiftedByMouse) {
      this.isShiftedByMouse = false;
      this.specialKeysFuncs.removeShift();
      this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== 'ShiftLeft');
    }
  }

  hydrateKeyboard() {
    const handleKeyDown = (e) => {
      if (this.nonHandledCodes.includes(e.code)) return;
      e.preventDefault();
      if (!this.keys[e.code]) return;
      const keyEl = this.keys[e.code].keyElem;
      keyEl.classList.add('active');

      if (!this.pressed.includes(e.code)) {
        this.pressed.push(e.code);
      }

      if (this.letterKeys.includes(e.code)) {
        this.handleLetterKey(this.keys[e.code]);
        this.checkShift();
      } else if (this.specialKeysFuncs[e.code]) {
        this.specialKeysFuncs[e.code](e);
      }

      if (e.repeat === false) {
        this.checkPressed();
      }
    };

    const handleMouseClick = (e) => {
      if (e.target.closest('.key')) {
        const keyCode = e.target.closest('.key').getAttribute('id');
        if (!this.keys[keyCode]) return;
        const key = this.keys[keyCode];

        if (this.letterKeys.includes(keyCode)) {
          this.handleLetterKey(key);
          this.checkShift();
        } else if (this.specialKeysFuncs[keyCode]) {
          this.specialKeysFuncs[keyCode](e);
        }

        if (!this.pressed.includes(keyCode)) {
          this.pressed.push(keyCode);
          this.checkPressed();
          this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== keyCode);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (!this.keys[e.code]) return;
      const keyEl = this.keys[e.code].keyElem;
      keyEl.classList.remove('active');
      this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== e.code);
    };

    const preventBlur = () => {
      const startPos = this.output.selectionStart;
      const finishPos = this.output.selectionEnd;
      this.output.focus();
      this.output.selectionStart = startPos;
      this.output.selectionEnd = finishPos;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    this.output.addEventListener('blur', preventBlur);
    this.input.addEventListener('click', handleMouseClick);
  }
}

export default Keyboard;
