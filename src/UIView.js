import { Event } from './EventObserver.js';
import {qs, qsa, createEl} from './utils/helpers.js';

import './ui.less';

import GameModel from './GameModel.js';
import GameView from './GameView.js';




export default class UIView {
  constructor (app) {
    this.el = createEl('div');
    this.render();
    Event.on("timer:changed", this.updateTimer);
  }

  addUIListeners() {
    this.$buttonStart = qs('.startGameButton', this.appRoot);
    this.$buttonPause = qs('.pauseGameButton', this.appRoot);
    this.$buttonResume = qs('.resumeGameButton', this.appRoot);
    this.$gameSize = qs('.levelGameButton', this.appRoot);

    console.log(this.$buttonStart, this.$buttonPause, this.$buttonResume, this.$gameSize);

    this.$menuIndex = qs('.menu-index', this.appRoot);
    this.$menuStats = qs('.menu-stats', this.appRoot);

    
      console.log('Events', this.$gameSize);
      this.$buttonStart.addEventListener("click", this.triggerStartGame.bind(this), false);
      this.$buttonPause.addEventListener("click", this.triggerPauseGame.bind(this), false);
      // this.$buttonResume.addEventListener("click", this.triggerResumeGame, false);


  }

  updateTimer(value) {
    console.log('timer updated', value);
  }

  triggerStartGame(handler) {
    console.log(this.$gameSize);
      let size = parseInt(this.$gameSize.value, 10);
      Event.trigger('game:start', size);
  }

  triggerPauseGame(handler) {
      Event.trigger('game:pause');
  }

  triggerResumeGame(handler) {
      Event.trigger('game:resume');
  }

  mainMenu() {
    return `
      <div class="menu">
        <div class="menu__item menu-index">
          <button class="menu-button resumeGameButton">Resume</button>
          <select class="menu-button levelGameButton">
            <option value="6">Easy</option>
            <option value="8">Normal</option>
            <option value="10">Hard</option>
            <option value="12">Very Hard</option>
          </select>
          <button class="menu-button startGameButton">Start</button>
          <button class="menu-button statsGameButton">Start</button>
          <button class="menu-button pauseGameButton">Stats</button>
        </div>

 
      </div>
    `;
  }

 
  render() {
    console.log('UIView render');
    let html = `
      <div class="app__item menu-container">
        ${ this.mainMenu() }
      </div>
      <div class="app__item timer-container"></div>
      <div class="app__item game-container"></div>
    `;
    this.el.innerHTML = html;
    

  }
}