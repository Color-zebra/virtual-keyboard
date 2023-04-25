window.onload = () => {
  function addCSS(aFile) {
    const style = window.document.createElement('link');
    style.href = aFile;
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  }

  addCSS('style.css');
};
