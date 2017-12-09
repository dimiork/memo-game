import { Event } from './EventObserver';
import { qs, qsa } from './utils/helpers';

var requireContext = require.context('./png/', true, /\.png$/);
requireContext.keys().forEach(requireContext);



export default class CardView {
  constructor(model) {
    this.model = model;
    this.el = document.createElement('div');
    this.cardFlippedEvent = '';
    

    this.cardFlipped = this.cardFlipped.bind(this);

    this.flipCard = this.flipCard.bind(this);
    this.removeMatchedCards = this.removeMatchedCards.bind(this);

    this.model.on = this.model.on.bind(this);

    this.model.on('change:flipped', this.flipCard);
    this.model.on('change:matched', this.removeMatchedCards);

    
    
    this.render();

    
  }
  
  cardFlipped(e) {
    e.preventDefault();
    if(this.model['flipped']) {
      return;
    }
    Event.trigger('cardFlippedEvent', this);
  }
  
  render() {


    var html = `<div class="card__value">
                  <img src="${requireContext("./"+this.model["image"])}" class="card__icon"/>
                </div>`;
    this.el.innerHTML = html;
    this.el.classList.add('game__item', 'card');
    this.el.onclick = this.cardFlipped;

  }
  
  flipCard(model) {
    if(this.model['flipped']) {
      this.el.classList.add('card_active');
      // this.el.style.backgroundColor = 'tomato';
    } else {
      this.el.classList.remove('card_active');
      // this.el.style.backgroundColor = 'orange';
    }
  }
  
  removeMatchedCards() {
    setTimeout(() => {
      this.el.classList.add('card_out');
    }, 500);
    // this.el.style.backgroundColor = 'white';
  }
}