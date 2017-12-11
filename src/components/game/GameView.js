import { Event } from '../../EventObserver';
import { qs, qsa } from '../../utils/helpers';
import CardView from './CardView.js';

export default class GameView {

  constructor (model) {

    this.model = model;
    this.el = document.createElement('div');

    this.fieldSize = this.model['qty'];
    this.clickHandler = this.clickHandler.bind(this);

    // Events binding
    Event.on("cardFlippedEvent", this.clickHandler);

    this.render();
  }

  clickHandler(card) {

    if(this.model['cardsClicked'] < 2) {

      this.model['cardsClicked'] += 1;
      card.model.setFlipped(true);
      
    }
    if(this.model['cardsClicked'] == 2 && this.model['isMatching'] == false) {
      
      this.model['isMatching'] = true;
      let activeCards = this.model.activeCards();
      if(activeCards[0]['value'] == activeCards[1]['value']) {
        
        setTimeout(() => {
          activeCards[0].setMatched(true);
          activeCards[1].setMatched(true);
          this.model['cardsClicked'] = 0;
          this.model['isMatching'] = false;
          this.model.stepsIncrement();
          
        }, 1000);

      } else {
        setTimeout(() => {
          activeCards[0].setFlipped(false);
          activeCards[1].setFlipped(false);
          this.model['cardsClicked'] = 0;
          this.model['isMatching'] = false;
          this.model.stepsIncrement();

        }, 1000);

  
      }
    }
  }

  render() {

    this.el.classList.add('main-view', 'game', `game_size_${ this.model.fieldSize }`)
    let cardModels = this.model['cardSet'];
    
    cardModels.forEach((cardModel) => {
      let cardView = new CardView(cardModel);
      this.el.appendChild(cardView.el);
    });
    return this.el;
  }

  destroy() {

    Event.unbind(this.clickHandler);
    var cardModels = this.model["cardSet"];
    cardModels.forEach(function(cardModel) {
      cardModel.destroy();
    });

    this.model.destroy();
    this.model = '';
    this.el = '';
  }
}