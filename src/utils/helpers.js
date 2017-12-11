
export function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}

export function qsa(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}

export function createEl(selector, scope) {
	return (scope || document).createElement(selector);
}

export function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

