import { qs, qsa } from './utils/helpers';
import { Event } from './EventObserver';

import GameModel from './components/game/GameModel';
import GameView from './components/game/GameView';

import MenuModel from './components/ui/MenuModel';
import MenuView from './components/ui/MenuView';

import TimerView from './components/ui/TimerView';
import StatsView from './components/ui/StatsView';
import PauseView from './components/ui/PauseView';

export default class Controller {

	constructor (appRoot) {

		this.game;
		this.app = appRoot;

		this.switchView = this.switchView.bind(this);

		let startButton = qs('.start-game');
		let resumeButton = qs('.resume-game');

		this.setTimer();
		this.setMenu();

		Event.on('timer:changed', this.updateTimer.bind(this));
		Event.on('game:end', this.switchView.bind(this));

	}

	clearApp() {

		while(this.app.hasChildNodes()) {
			this.app.removeChild(this.app.lastChild);
		}
	}

	createGame(field_size) {

		if(this.game) {
			this.game.model.gameStatus('aborted');

			// Destroy game instance
			this.game.destroy();

		}
		this.game = new GameView(new GameModel(field_size, Math.random()));
		this.switchGame();
	}

	switchGame() {

		this.clearApp();
		this.timerView.show();
		this.app.appendChild(this.game.el);
	}

	setMenu() {

		this.menuButton = new MenuView(new MenuModel(this.switchView));
		qs('body').appendChild(this.menuButton.el);
	}

	setStats(data) {

		this.clearApp();
		this.statsView = new StatsView(data);
		this.app.appendChild(this.statsView.el);
	}

	setPause() {

		this.clearApp();
		this.pauseView = new PauseView();
		this.app.appendChild(this.pauseView.el);
	}

	setTimer() {

		this.timerView = new TimerView();
		qs('body').appendChild(this.timerView.el);

	}

	updateTimer(value) {
		this.timerView.el.innerHTML = value;
	}

	switchView(view, options) {

			switch (view) {
				case 'start':
					this.createGame(options);
					this.game.model.gameStatus('start');
				  break;
				case 'pause':
					this.setPause();
					this.game.model.gameStatus('pause');
				  break;
				case 'resume':
					this.switchGame();
					this.game.model.gameStatus('resume');
				  break;
				case 'stats':
					this.game.model.gameStatus('pause');
					this.setStats(this.game.model.store.getAll());
				  break;
				case 'end':
					this.setStats(this.game.model.store.getAll());
				  break;  
			}

	}

	init(appRoot) {
		this.app = appRoot;
		let startButton = qs('.start-game');
		let resumeButton = qs('.resume-game');

		this.setTimer();
		this.setMenu();


	}

}