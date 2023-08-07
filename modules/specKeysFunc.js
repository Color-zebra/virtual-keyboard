import KeyFactory from './keyFactory.js';

class SpecialKeysFunc extends KeyFactory {
  constructor() {
    super();
    this.specialKeysFuncs = {
      Backspace: () => {
        const startPos = this.output.selectionStart;
        const finishPos = this.output.selectionEnd;
        if (startPos === finishPos) {
          if (startPos === 0) return;
          this.output.value = this.output.value.slice(0, startPos - 1)
                              + this.output.value.slice(startPos);
          this.output.selectionStart = startPos - 1;
          this.output.selectionEnd = startPos - 1;
        } else {
          this.output.value = this.output.value.slice(0, startPos)
                              + this.output.value.slice(finishPos);
          this.output.selectionStart = startPos;
          this.output.selectionEnd = startPos;
        }
      },
      Delete: () => {
        const startPos = this.output.selectionStart;
        const finishPos = this.output.selectionEnd;
        if (startPos === finishPos) {
          if (startPos === this.output.value.length) return;
          this.output.value = this.output.value.slice(0, startPos)
                              + this.output.value.slice(startPos + 1);
        } else {
          this.output.value = this.output.value.slice(0, startPos)
                              + this.output.value.slice(finishPos);
        }
        this.output.selectionStart = startPos;
        this.output.selectionEnd = startPos;
      },
      Tab: () => {
        this.handleLetterKey({ keyValue: { innerText: '\u0009' } });
        this.checkShift();
      },
      Space: () => {
        this.handleLetterKey({ keyValue: { innerText: ' ' } });
        this.checkShift();
      },
      Enter: () => {
        this.handleLetterKey({ keyValue: { innerText: '\n' } });
        this.checkShift();
      },
      ArrowUp: () => {
        this.handleLetterKey({ keyValue: { innerText: '\u2191' } });
        this.checkShift();
      },
      ArrowDown: () => {
        this.handleLetterKey({ keyValue: { innerText: '\u2193' } });
        this.checkShift();
      },
      ArrowLeft: () => {
        this.handleLetterKey({ keyValue: { innerText: '\u2190' } });
        this.checkShift();
      },
      ArrowRight: () => {
        this.handleLetterKey({ keyValue: { innerText: '\u2192' } });
        this.checkShift();
      },
      removeShift: () => {
        this.isShifted = false;
        this.keys.ShiftLeft.keyElem.classList.remove('active');
        this.keys.ShiftRight.keyElem.classList.remove('active');
        this.keys.ShiftLeft.keyElem.classList.remove('toggled');
        this.keys.ShiftRight.keyElem.classList.remove('toggled');
        this.updateKeyboard();
      },
      setShift: () => {
        this.isShifted = true;
        this.keys.ShiftLeft.keyElem.classList.add('toggled');
        this.keys.ShiftRight.keyElem.classList.add('toggled');
        this.updateKeyboard();
      },
      ShiftLeft: (e) => {
        if (e.repeat) return;
        if (e.type === 'click') {
          if (!this.isShifted) {
            this.specialKeysFuncs.setShift();
            this.isShiftedByMouse = true;
            this.pressed.push('ShiftLeft');
          } else {
            this.specialKeysFuncs.removeShift();
            this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== 'ShiftLeft');
          }
          return;
        }
        this.isShifted = true;
        this.updateKeyboard();
        const killShift = (evnt) => {
          if (evnt.code === 'ShiftLeft' || evnt.code === 'ShiftRight') {
            this.specialKeysFuncs.removeShift();
            document.removeEventListener('keyup', killShift);
          }
        };
        document.addEventListener('keyup', killShift);
      },
      ShiftRight: (e) => {
        if (e.repeat) return;
        if (e.type === 'click') {
          if (!this.isShifted) {
            this.specialKeysFuncs.setShift();
            this.isShiftedByMouse = true;
            this.pressed.push('ShiftRight');
          } else {
            this.specialKeysFuncs.removeShift();
            this.pressed = this.pressed.filter((pressedKeyCode) => pressedKeyCode !== 'ShiftRight');
          }
          return;
        }
        this.isShifted = true;
        this.updateKeyboard();
        const killShift = (evnt) => {
          if (evnt.code === 'ShiftLeft' || evnt.code === 'ShiftRight') {
            this.specialKeysFuncs.removeShift();
            document.removeEventListener('keyup', killShift);
          }
        };
        document.addEventListener('keyup', killShift);
      },
      CapsLock: (e) => {
        if (e.repeat) return;
        this.isCapsed = !this.isCapsed;
        this.updateKeyboard();
        this.keys.CapsLock.keyElem.classList.toggle('toggled');
      },
    };
  }
}

export default SpecialKeysFunc;
