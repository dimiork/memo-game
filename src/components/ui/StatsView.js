import { qs, qsa, createEl } from '../../utils/helpers';

export default class StatsView {

	constructor (data) {

		this.data = data;
		this.el = createEl('div');

		this.render();
	}

	dataTabs() {

		return Object.keys(this.data).reduce((a, el, index) => a +
			`<input id="tab${index+1}" type="radio" name="tabs" ${ index ? '' : 'checked' }>
			 <label for="tab${index+1}">${ el }</label>`, '');
	}

	dataLevels() {

		let data = this.data;
		let html = '';
		Object.keys(data).forEach((value, i) => {
			html += `<section id="content${ i+1 }"><div><span> Time </span><span> Steps </span></div>`;
		  html += data[value].reduce((a, item, index) => a + 
		  	`<div><span> ${ item.time } </span><span> ${ item.steps } </span></div>
		  	`, '');
		  html += `</section>`;
		})
		
		return html;
	}

	statsView() {

		let html = `
		<main>
			${ this.dataTabs() }
			
		  ${ this.dataLevels() }

		    
		</main>
		`;
		return html;
	}

	render() {

		this.el.innerHTML = this.statsView();
		this.el.classList.add('main-view');
	}
}