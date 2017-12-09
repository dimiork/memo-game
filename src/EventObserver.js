class EventObserver {
  constructor() {
    this.observers = [];
    this.on = this.on.bind(this);
  }

on(event, fn) {
	// console.log('SUBSCRIBED', event, fn);
  this.observers.push({ evt: event, fn: fn});
}

unbind(fn) {
  this.observers = this.observers.filter((subscriber) => subscriber !== fn);
}

trigger(event, data) {
	// console.log('observers', this.observers);
	// console.log('TRIGGER', event, data);
  this.observers.filter((observer) => {
  	
  	return observer.evt === event;
  }).forEach((subscriber) => {
    // console.log('filtered', subscriber);
    subscriber.fn(data)
  });
}
}

export let State = EventObserver;
export let Event = new EventObserver();