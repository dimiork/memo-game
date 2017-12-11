import { State } from '../../EventObserver';

export default class CardModel extends State {

  constructor (options) {

    super();
    this.flipped = false;
    this.matched = false;
    this.value = options.value;
    this.image = options.imagePath;
  }
  
  setFlipped(val) {
      
    this.flipped = val; 
    this.trigger('change:flipped', this);
  }
  
  setMatched(val) {
      
    this.matched = val;  
    this.trigger('change:matched');
  }

  destroy() {
    this.unbindAll();
  }
}