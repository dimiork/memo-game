export default class MenuModel {
	
	constructor(callback) {

		this.state;
		this.callback = callback;
	}

	setState(state, options) {

		this.state = state;
		this.callback(state, options);
	}

}