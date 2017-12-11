export default class Store {

	constructor () {

		const localStorage = window.localStorage;
		let scoreList = {};

		this.getlocalStorage = (scope) => {

			return scoreList[scope] || JSON.parse(localStorage.getItem(scope) || '[]');
		};

		this.setLocalStorage = (score, scope) => {

			localStorage.setItem(scope, JSON.stringify(scoreList[scope] = score));
		};

		this.add = this.add.bind(this);
		this.getAll = this.getAll.bind(this);
	}

	getAll () {

		let scores = {};
		[6, 8, 10, 12].forEach((level) => {
			scores[level] = this.getlocalStorage(level);
		})
		return scores;
	}

	add (score, scope) {

		const scores = this.getlocalStorage(scope);
		scores.push(score);
		this.setLocalStorage(scores, scope);
	}

}