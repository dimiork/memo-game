
import Controller from './Controller.js';



import './app.less';






// const uiView = new UIView(appRoot);
// uiView.render();
let appRoot = document.querySelector('#app')
const controller = new Controller();
controller.initApp(appRoot);


// appRoot.appendChild(gameView.el);
