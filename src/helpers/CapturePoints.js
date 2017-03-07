import {Circle} from './Helper'
import {TimelineMax} from 'gsap'
import {autorun} from 'mobx'

class Capture {
	constructor(canvas, store) {
		this.store = store


		this.isDown = false
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		this.canvas.addEventListener('mousemove', this.onMove.bind(this), false )
		this.canvas.addEventListener('mousedown', this.onDown.bind(this), false )
		this.canvas.addEventListener('mouseup', this.onUp.bind(this), false )
		this.canvas.addEventListener('mouseout', this.onOut.bind(this), false )

		this.tl = new TimelineMax()
		this.color = 'rgba(255, 0, 255, .2)'
		this.prev = {x:-1, y:-1}

		this.currentItem = []


		this.auto()
	}

	auto() {
		autorun(() => {
			this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
			this.store.points.forEach(pos => this.drawCircle(pos.x, pos.y) )
		});
	}


	undo(){
		this.store.removeUndoItem()
	}

	onOut() {
		this.isDown = false
		this.store.addUndoItem(this.currentItem)
		this.currentItem = []
	}




	onDown(e) {
		e.preventDefault()
		this.currentItem = []
		this.isDown = true
	}

	onUp() {
		this.isDown = false
		this.store.addUndoItem(this.currentItem)
		this.currentItem = []
	}



	onMove(e){
		if(!this.isDown) { return }

		const pos = this.getMousePos(this.canvas, e)
		if(pos.x!==this.prev.x|| pos.y!==this.prev.y) {
			this.currentItem.push(pos)
			this.prev = pos
			this.drawCircle(pos.x, pos.y)
		}
	}

	drawCircle(x, y) {
		Circle(this.ctx, x, y, this.store.brush, this.color)
	}


	startOver() {
		this.store.starOver()
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}



	getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect()
        return {
          x: Math.round(evt.clientX - rect.left),
          y: Math.round(evt.clientY - rect.top)
        };
    }
}

export default Capture