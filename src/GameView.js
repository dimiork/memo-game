import { Event } from './EventObserver.js';

import CardView from './CardView.js';



export default class GameView {
  constructor (model) {
    this.model = model;
    // console.log('GameView Model', model);
    this.el = document.createElement('div');

    this.checkMatch = this.checkMatch.bind(this);
    
    this.model.generateCards(18);
    this.render();
    Event.on("cardFlippedEvent", this.checkMatch)
  }
  
  checkMatch(card) {
    // console.log('CHECK MATCH CALLED', this.model['cardsClicked'], card);
    if(this.model['cardsClicked'] < 2) {
      console.log('checkMatch', this.model['cardsClicked']);
      this.model['cardsClicked'] = this.model['cardsClicked'] + 1;
      // console.log('game.model', this.model);
      // console.log('card.model', card.model);
      card.model.setFlipped(true);
      
    }
    if(this.model['cardsClicked'] == 2 && this.model['isMatching'] == false) {
      this.model['isMatching'] = true;
      console.log('checkMatch', this.model['cardsClicked']);
      let flippedCards = this.model['cardSet'].filter((el) => el.flipped === true && el.matched === false);
      // console.log('flippedCards', flippedCards);
      if(flippedCards[0]['value'] == flippedCards[1]['value']) {
        
        setTimeout(() => {
          flippedCards[0].setMatched(true);
          flippedCards[1].setMatched(true);
          this.model['cardsClicked'] = 0;
          this.model['isMatching'] = false;
          
        }, 1000)


      } else {
        setTimeout(() => {
          flippedCards[0].setFlipped(false);
          flippedCards[1].setFlipped(false);
          this.model['cardsClicked'] = 0;
          this.model['isMatching'] = false;

        }, 1000)

  
      }
    }
  }

  render() {

    this.el.classList.add('game', 'game_size_6')
    // console.log('GameView Render', this.model['cardSet']);
    let cardModels = this.model['cardSet'];
    cardModels.forEach((cardModel) => {
      let cardView = new CardView(cardModel);
      this.el.appendChild(cardView.el);
    });
  }
}