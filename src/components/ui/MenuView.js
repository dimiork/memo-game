import { qs, qsa, createEl } from '../../utils/helpers';
import { Event } from '../../EventObserver';

export default class MenuView {

	constructor (model) {

		this.model = model;
		this.el = createEl('div');

		Event.on('game:status', this.changeView.bind(this));

		this.render();
	}

	changeView(gameStatus) {

		switch (gameStatus) {
			case 'start':
				this.setGameStarted();
			  break;
			case 'pause':
				this.setGamePaused();
			  break;
			case 'resume':
				this.setGameStarted();
			  break;
			case 'end':
				this.setGameEnded();
			  break;
		}
	}

	toggleMenu() {

		qs('.main-menu__grouped', this.el).classList.toggle('main-menu_hide');
	}

	setGameStarted() {

		qs('.resume-button', this.el).classList.add('menu-button_hide');
		qs('.pause-button', this.el).classList.remove('menu-button_hide');
		qs('.stats-button', this.el).classList.remove('menu-button_hide');
	}

	setGamePaused() {

		qs('.resume-button', this.el).classList.remove('menu-button_hide');
		qs('.pause-button', this.el).classList.add('menu-button_hide');
		qs('.stats-button', this.el).classList.remove('menu-button_hide');
	}

	setGameEnded() {

		qs('.resume-button', this.el).classList.add('menu-button_hide');
		qs('.pause-button', this.el).classList.add('menu-button_hide');
		qs('.stats-button', this.el).classList.remove('menu-button_hide');
	}

	changeState(e) {

		e.preventDefault();
		this.toggleMenu();
		let state = e.target.dataset.state || 'none';
		let gameSize = e.target.value;
		this.model.setState(state, gameSize);
		
	}


	newButtonView() {

		let html = `
			<div class="main-menu">
				<div class="main-menu__grouped main-menu_hide">
				  <div class="main-menu__item">
				    <button value="pause" data-state="pause"  class="pause-button menu-button_hide">Pause</button>
				    <button value="resume" data-state="resume"  class="resume-button menu-button_hide">Resume</button>
				  </div>
				  <div class="main-menu__item">
				  	<button disabled>New Game</button>
				  </div>
				  <div class="main-menu__item main-menu__item_grouped">
				    <button class="start-button" data-state="start" value="6">Easy</button>
				    <button class="start-button" data-state="start"  value="8">Normal</button>
				    <button class="start-button" data-state="start"  value="10">Hard</button>
				    <button class="start-button" data-state="start"  value="12">Very Hrad</button>
				  </div>
				  <div class="main-menu__item">
				    <button value="stats" data-state="stats"  class="stats-button menu-button_hide">Stats</button>
				  </div>
				</div>
				<div class="main-menu__button">
				  <button>M</button>
				</div>
			</div>
		`;
		return html;
	}

	render() {

		this.el.innerHTML = this.newButtonView();
		this.el.classList.add('menu-button');
		qs('.main-menu__button', this.el).onclick = this.toggleMenu.bind(this);
		qsa('.main-menu__item button', this.el).forEach((button) => button.onclick = this.changeState.bind(this));
	}
}