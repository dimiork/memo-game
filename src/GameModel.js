import CardModel from './CardModel';
import { ImageIcons } from './Icons.js';



export default class GameModel {
  constructor(options) {
    this.cardsClicked = 0;
    this.cardSet = [];
    this.isMatching = false;
    // this.cardSet = options.cardSet;
    // console.log('cardSet', this.cardSet);

  }

  generateCards(qty) {
  	let res = ImageIcons(qty);
  	let doubledAndShuffled = res.concat(res.slice()).sort(() => Math.random() - 0.5);
  	// console.log('ImageIcons Result', res, doubledAndShuffled);

  	
  	doubledAndShuffled.forEach((value) => {
  		this.cardSet.push(new CardModel({value: value, matched: false, imagePath: value }));
  	});
  	
  }
}