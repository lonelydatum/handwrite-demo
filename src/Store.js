import { observable, toJS, action, computed } from "mobx"

import Anal from './ui/Anal.js'


class Store {
	@observable __image = localStorage.getItem('image')
	@observable __brush = parseInt(localStorage.getItem('brush'), 10) || 6
	@observable __speed = parseInt(localStorage.getItem('speed'), 10) || 5
	@observable undoList = []

	@observable __cleanFromBehind = localStorage.getItem('cleanFromBehind') ? JSON.parse(localStorage.getItem('cleanFromBehind')) : false
	@observable __cleanUpWhenDone = localStorage.getItem('cleanUpWhenDone') ? JSON.parse(localStorage.getItem('cleanUpWhenDone')) : true
	@observable __isMobile = !window.matchMedia( "(min-width: 700px)" ).matches;

	constructor() {
		// console.log(JSON.parse(localStorage.getItem('cleanFromBehind')) );
		if(localStorage.getItem('points')) {
			const p = JSON.parse(localStorage.getItem('points'))
			this.addUndoItem(p)
		}

		window.onresize = this.onresize.bind(this)



	}

	@action starOver() {
		this.undoList = []
	}

	@action addUndoItem(undoItem) {
		this.undoList.push(undoItem)

	}

	@action removeUndoItem() {
		console.log(this.undoList.toJS().length);
		this.undoList.splice(-1, 1)

	}

	@action toggleCleanFromBehind() {
		this.cleanFromBehind = !this.cleanFromBehind
	}

	@action togglecleanUpWhenDone() {
		this.cleanUpWhenDone = !this.cleanUpWhenDone
	}

	@action onresize() {
		// this.isMobile = true
		this.isMobile =  !window.matchMedia( "(min-width: 700px)" ).matches;

		// this.setState({isMobile:true})
	}

	@computed get points() {
		let pList = []
		this.undoList.forEach(item=>{
			pList = pList.concat(item.toJS())
		})
		console.log(this.undoList.toJS());
		localStorage.setItem('points', JSON.stringify(pList))
		return pList
	}


	set image(base64) {
		Anal('added image');
		this.__image = base64
		localStorage.setItem('image', base64)
	}

	get image() {
		return this.__image
	}

	set isMobile(boo) {
		this.__isMobile = boo
	}

	get isMobile() {
		return this.__isMobile
	}


	set brush(value) {
		this.__brush = value
		localStorage.setItem('brush', value)
	}

	get brush() {
		return this.__brush
	}

	set speed(value) {
		this.__speed = value
		localStorage.setItem('speed', value)
	}

	get speed() {
		return this.__speed
	}

	get cleanFromBehind() {
		return this.__cleanFromBehind
	}

	set cleanFromBehind(value) {
		this.__cleanFromBehind = value
		localStorage.setItem('cleanFromBehind', JSON.stringify(value))
	}



	get cleanUpWhenDone() {
		return this.__cleanUpWhenDone
	}

	set cleanUpWhenDone(value) {
		this.__cleanUpWhenDone = value
		localStorage.setItem('cleanUpWhenDone', JSON.stringify(value))
	}

	// set point(value) {
	// 	console.log('this');
	// 	this.__points = value
	// 	localStorage.setItem('points', JSON.stringify(value))
	// }

	// get points() {
	// 	return this.__points
	// }

}

export default new Store()