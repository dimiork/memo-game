import { Event } from './EventObserver';
import CardModel from './CardModel';
import { ImageIcons } from './Icons';



export default class GameModel {
  constructor(options) {
  	console.log(options)
    this.cardsClicked = 0;
    this.cardSet = [];
    this.isMatching = false;
    this.timer = {
      id: 0,
      value: 0
    };
    console.log('cardSet', this.gameSize);

  }

  startGame() {
  	
  }

  startTimer() {

    this.timer.id = setInterval(() => {
      // render timer in UI
      this.time.value + 1;
      Event.trigger('timer:changed', this.timer.value);

    }, 1000);
  }

  generateCards(qty) {
  	let res = ImageIcons(qty);
  	let doubledAndShuffled = res.concat(res.slice()).sort(() => Math.random() - 0.5);

  	
  	doubledAndShuffled.forEach((value) => {
  		this.cardSet.push(new CardModel({value: value, matched: false, imagePath: value }));
  	});
  	
  }
}