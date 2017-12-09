import UIView from './UIView.js';
import GameModel from './GameModel.js';
import GameView from './GameView.js';
import CardModel from './CardModel.js';


import './app.less';


let cardSetCollection = [
				new CardModel({value: '1', matched: false, imagePath: 'images/bargs.jpeg'}),
        new CardModel({value: '1', matched: false, imagePath: 'images/bargs.jpeg'}),
        new CardModel({value: '2', matched: false, imagePath: 'images/coorslight.jpeg'}),
        new CardModel({value: '2', matched: false, imagePath: 'images/coorslight.jpeg'}),
        new CardModel({value: '3', matched: false, imagePath: 'images/duff.jpeg'}),
        new CardModel({value: '3', matched: false, imagePath: 'images/duff.jpeg'}),
        new CardModel({value: '4', matched: false, imagePath: 'images/fattire.jpeg'}),
        new CardModel({value: '4', matched: false, imagePath: 'images/fattire.jpeg'}),
        new CardModel({value: '5', matched: false, imagePath: 'images/guinness.jpeg'}),
        new CardModel({value: '5', matched: false, imagePath: 'images/guinness.jpeg'}),
        new CardModel({value: '6', matched: false, imagePath: 'images/miller.jpeg'}),
        new CardModel({value: '6', matched: false, imagePath: 'images/miller.jpeg'}),
        new CardModel({value: '7', matched: false, imagePath: 'images/oldmilwaukee.jpeg'}),
        new CardModel({value: '7', matched: false, imagePath: 'images/oldmilwaukee.jpeg'}),
        new CardModel({value: '8', matched: false, imagePath: 'images/8-bit.jpeg'}),
        new CardModel({value: '8', matched: false, imagePath: 'images/8-bit.jpeg'})
				];

let appRoot = document.querySelector('#app')

var gameModel = new GameModel({cardSet: cardSetCollection});
var gameView = new GameView(gameModel);
const uiView = new UIView(appRoot, gameView);
uiView.render();


// appRoot.appendChild(gameView.el);
