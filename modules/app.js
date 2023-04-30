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
