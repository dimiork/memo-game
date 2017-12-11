import { qs, qsa, $on } from './utils/helpers';

import Controller from './MainController';

import './app.less';


const app = qs('.app');
const setView = () => new Controller(app);;
$on(window, 'load', setView);