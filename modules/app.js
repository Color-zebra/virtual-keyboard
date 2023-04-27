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
    const output = document.getElementById('output');
    output.addEventListener('click', () => {
      console.log(output.value);
      console.log(output.value.split('').filter((letter) => letter === '\n').length);
    });
    this.keyboard.initKeyboard();
    /* document.body.innerHTML = `
      <div class="wrapper">
        <div class="keyboard">
          <div class="keyboard__monitor">
            <textarea class="keyboard__screen"></textarea>
          </div>
          <div class="keyboard__board">
            <div class="keyboard__keyzone"></div>
          </div>
        </div>
      </div>
    `; */
  }
}

export default App;
