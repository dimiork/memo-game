import { Event } from './EventObserver';
import UIView from './UIView';
import GameModel from './GameModel';
import GameView from './GameView';


export default class Controller {
	constructor(appRoot) {
		this.ui = new UIView();
		this.gameView;
		this.appRoot;
		this.gameRoot;

		Event.on('game:start', this.startGame);
	}

  initApp(app) {
  	this.appRoot = app;
  	this.appRoot.appendChild(this.ui.el);
  	setTimeout(() => {
  		this.ui.addUIListeners();
  		console.log('Set Listeners');
  	}, 1000);
  	
  	console.log('I\'m initializator.');

  }

  initGame(gameRoot, fieldSize) {
  	let cardsQty = fieldSize * fieldSize;
  	this.gameView = new GameView( new GameModel( cardsQty ) );
  	this.gameRoot.appendChild(gameView.el);
  }
}