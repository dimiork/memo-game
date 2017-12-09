import { Event } from './EventObserver.js';
import {qs, qsa} from './utils/helpers.js';




export default class UIView {
  constructor (app, GameView) {
    this.appRoot = app;
    this.GameView = GameView;
    // this.render();
  }
  
  render() {
    let html = `
      <div class="app__item menu-container"></div>
      <div class="app__item timer-container"></div>
      <div class="app__item game-container"></div>
    `;
    this.appRoot.innerHTML = html;
    qs('.game-container', this.appRoot).appendChild(this.GameView.el);

  }
}