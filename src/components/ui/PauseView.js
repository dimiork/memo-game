import { qs, qsa, createEl } from '../../utils/helpers';

export default class MenuView {
	constructor () {
		this.el = createEl('div');

		this.render();
	}

	pauseView() {
		let html = `
			<div>Anadea Inc.</div>
		`;
		return html;
	}

	render() {
		this.el.innerHTML = this.pauseView();
		this.el.classList.add('pause-view');
	}
}