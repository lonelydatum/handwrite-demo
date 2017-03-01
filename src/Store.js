import { observable, toJS, action, computed } from "mobx"

class Store {
	@observable __image = localStorage.getItem('image')
	@observable __brush = parseInt(localStorage.getItem('brush'), 10) || 2
	@observable __speed = parseInt(localStorage.getItem('speed'), 10) || 5
	@observable undoList = []



	constructor() {
		if(localStorage.getItem('points')) {
			const p = JSON.parse(localStorage.getItem('points'))
			this.addUndoItem(p)
		}


	}

	@action starOver() {
		this.undoList = []
	}

	@action addUndoItem(undoItem) {
		this.undoList.push(undoItem)
	}

	@action removeUndoItem(undoItem) {
		this.undoList.splice(-1, 1)
	}

	@computed get points() {
		let pList = []
		this.undoList.forEach(item=>{
			pList = pList.concat(item.toJS())
		})

		localStorage.setItem('points', JSON.stringify(pList))
		return pList
	}


	set image(base64) {
		this.__image = base64
		localStorage.setItem('image', base64)
	}

	get image() {
		return this.__image
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