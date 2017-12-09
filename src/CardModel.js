import { State } from './EventObserver.js';

export default class CardModel extends State {
  constructor (options) {
    super();
    this.flipped = false;
    this.matched = false;
    this.value = options.value;
    this.image = options.imagePath;
    
    
  }
  
  setFlipped(val) {
    // if(typeof val === 'boolean') {
      
      this.flipped = val; 
      this.trigger('change:flipped', this);
    // }
    
  }
  
  setMatched(val) {
    // if(typeof val === 'boolean') {
      
      this.matched = val;  
      this.trigger('change:matched');
    // }
    
  }
}