import { Event } from '../../EventObserver';
import { qs, qsa } from '../../utils/helpers';

var requireContext = require.context('../../icons/', true, /\.png$/);
requireContext.keys().forEach(requireContext);

export default class CardView {

  constructor(model) {

    this.model = model;
    this.el = document.createElement('div');

    // Scope binding
    this.cardFlipped = this.cardFlipped.bind(this);
    this.flipCard = this.flipCard.bind(this);
    // this.model.on = this.model.on.bind(this);
    this.removeMatchedCards = this.removeMatchedCards.bind(this);

    // Events binding
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

  flipCard(model) {

    if(this.model['flipped']) {
      this.el.classList.add('card_active');
    } else {
      this.el.classList.remove('card_active');
    }
  }
  
  removeMatchedCards() {
    setTimeout(() => {
      this.el.classList.add('card_out');
    }, 500);
  }

  render() {

    var html = `<div class="card__value">
                  <img src="${requireContext("./"+this.model["image"])}" class="card__icon"/>
                </div>`;
    this.el.innerHTML = html;
    this.el.classList.add('game__item', 'card');
    this.el.onclick = this.cardFlipped;

  }

  destroy() {
    this.el = '';
    this.model.destroy();
    this.model = '';
  }
}