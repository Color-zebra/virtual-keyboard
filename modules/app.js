import KeyFactory from './keyFactory.js';
import Keyboard from './keyboard.js';

class App extends KeyFactory {
  constructor() {
    super();
    this.addCSS = (fileName) => {
      const style = window.document.createElement('link');
      style.href = fileName;
      style.rel = 'stylesheet';
      document.head.appendChild(style);
    };
    this.keyboard = new Keyboard();
  }

  initApp() {
    this.addCSS('style.css');
    document.body.innerHTML = `
    <div class="wrapper">
      <div class="keyboard">
        <div class="keyboard__monitor">
          <textarea class="keyboard__screen" id="output" cols="135"></textarea>
        </div>
        <div class="keyboard__desc">
          Клавиатура выполнена на Windows. Для смены языка использовать сочетание Shift + Ctrl. При смене языка с помощью мыши первой клавишей кликать на Shift. (При клике мышкой шифт работает до первой нажатой буквы). Из ES6 использовались classes, let, const, arrow functions.
        </div>
        <div class="keyboard__board">
          <div class="keyboard__keyzone" id="input"></div>
        </div>
      </div>
    </div>
    `;
    this.keyboard.initKeyboard();
  }
}

export default App;
