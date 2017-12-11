class EventObserver {

  constructor() {

    this.observers = [];
    this.on = this.on.bind(this);
  }

on(event, fn) {

  this.observers.push({ evt: event, fn: fn});
}

off(event) {

  this.observers = this.observers.filter((observer) => observer.evt === event);
}

unbindAll() {

  this.observers = [];
}

unbind(fn) {

  this.observers = this.observers.filter((subscriber, i) => {
    return  subscriber.fn !== fn
  });
}

trigger(event, data) {

  this.observers.filter((observer) => {
  	
  	return observer.evt === event;
  }).forEach((subscriber) => {
    subscriber.fn(data);
  });
}
}

export let State = EventObserver;
export let Event = new EventObserver();