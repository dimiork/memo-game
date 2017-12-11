import { qs, qsa, createEl } from '../../utils/helpers';

export default class TimerView {

	constructor () {

		this.el = createEl('div');

		this.render();
	}

	show() {

		this.el.classList.remove('timer-view_hide');
	}

	updateVaule(value) {

		tihs.el.innerHTML = value;
	}

	render() {

		this.el.classList.add('timer-view', 'timer-view_hide');
	}
}