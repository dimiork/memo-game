import { Event, State } from '../../EventObserver';
import Store from '../../Store.js';
import CardModel from './CardModel';
import { ImageIcons } from '../../Icons.js';

export default class GameModel extends State {

  constructor(options) {

  	super();
    this.cardsClicked = 0;
    this.cardSet = [];
    this.isMatching = false;
    this.store = new Store('anadea-memo');

    this.fieldSize = options;
    this.timerId;

    this.steps = 0;
    this.time = 0;

    this.generateCards(this.fieldSize);
  }

  activeCards() {

    return this.cardSet.filter((card) => {
      return card.flipped === true && card.matched === false;
    });
  }

  matchActiveCards() {

    let activeСards = this.model.activeCards();
    return activeCards[0]['value'] === activeCards[1]['value'];
  }

  stepsIncrement() {

  	this.steps += 1;
  	this.checkGameState();
  }

  checkGameState() {

  	let cardsLeft = this.cardSet.filter((el) => el.matched === false).length;

  	if(!cardsLeft) {
  		this.gameStatus('end');
  	}
  }

	gameStatus(status) {

		this.status = status;
    Event.trigger('game:status', status);

		switch (status) {
			case 'start': 
				this.time = 0;
				this.steps = 0;
				this.runTimer();
				break;

			case 'pause':
				this.killTimer();
				break;

			case 'resume':
			  this.runTimer();
			  break;

      case 'abort':
        this.killTimer();
        break;

			case 'end':
				this.killTimer();
				this.store.add({ time: this.time, steps: this.steps }, this.fieldSize );
        Event.trigger('game:end', 'end');
				break;
		}
	}

  runTimer() {

    if(this.timerId) {
      this.killTimer();
    }
    this.timerId = setInterval(() => {
      this.time += 1;
      Event.trigger('timer:changed', this.time);
    }, 1000);
  }

  killTimer() {

  	window.clearInterval(this.timerId);
  }

  calculateCards(fieldSize) {

  	let qty = fieldSize * fieldSize / 2 || 18;
  	return qty;
  }

  generateCards(fieldSize) {
  	let qty = this.calculateCards(fieldSize);
  	let res = ImageIcons(qty);
  	let doubledAndShuffled = res.concat(res.slice()).sort(() => Math.random() - 0.5);
  	
  	doubledAndShuffled.forEach((value) => {

  		this.cardSet.push(new CardModel({value: value, matched: false, imagePath: value }));
  	});
  	
  }

  destroy() {

    this.killTimer();
    this.unbindAll();
  }
}