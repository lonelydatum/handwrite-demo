import {Circle} from './Helper'
import {TimelineMax} from 'gsap'
import {autorun} from 'mobx'

const ga = window.ga

class Capture {
	constructor(canvas, store) {
		this.store = store


		this.isDown = false
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		// this.canvas.addEventListener('mousemove', this.onMove.bind(this), false )
		// this.canvas.addEventListener('mousedown', this.onDown.bind(this), false )
		// this.canvas.addEventListener('mouseup', this.onUp.bind(this), false )
		// this.canvas.addEventListener('mouseout', this.onOut.bind(this), false )


		this.canvas.addEventListener('mousedown', this.sketchpad_mouseDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.sketchpad_mouseMove.bind(this), false);
        window.addEventListener('mouseup', this.sketchpad_mouseUp.bind(this), false);

        // React to touch events on the canvas
        this.canvas.addEventListener('touchstart', this.sketchpad_touchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.sketchpad_touchMove.bind(this), false);


		this.tl = new TimelineMax()
		this.color = 'rgba(0, 255, 0, .2)'
		this.prev = {x:-1, y:-1}

		this.currentItem = []
		this.touchX
		this.touchY
		this.mouseX
		this.mouseY
		this.mouseDown = 0


		this.auto()


	}

	sketchpad_mouseDown(e) {

		this.mouseDown = 1;
        this.drawCircle(this.mouseX, this.mouseY)
	}

	sketchpad_mouseMove(e) {

		this.getMousePos(e)
		if (this.mouseDown===1) {
            this.didDoing(this.mouseX, this.mouseY)
        }
	}

	sketchpad_mouseUp(e) {


		if(this.mouseDown === 1) {
			this.didDone()
		}
		this.mouseDown = 0

	}

	sketchpad_touchStart(e) {
		this.getTouchPos(e)
		this.drawCircle(this.touchX, this.touchY)
		e.preventDefault()
	}

	sketchpad_touchMove(e) {
		this.getTouchPos(e);
		// this.drawCircle(this.touchX, this.touchY)
		this.didDoing(this.touchX, this.touchY)

		e.preventDefault()
	}

	getOffset(obj) {
		var offsetLeft = 0;
		var offsetTop = 0;
		do {
		if (!isNaN(obj.offsetLeft)) {
		  offsetLeft += obj.offsetLeft;
		}
		if (!isNaN(obj.offsetTop)) {
		  offsetTop += obj.offsetTop;
		}
		} while(obj = obj.offsetParent );
		return {left: offsetLeft, top: offsetTop};
	}

	getTouchPos(e) {
        // if (!e)
        //     var e = event;

        // ctx.fillRect(event.touches[0].pageX-offset.left, event.touches[0].pageY-offset.top, 5, 5);



        if(e.touches) {

            if (e.touches.length === 1) { // Only deal with one finger

                var touch = e.touches[0]; // Get the information for finger #1
                const offset = this.getOffset(touch.target)
                this.touchX = touch.pageX - offset.left
                this.touchY = touch.pageY - offset.top
                // console.log(this.touchX, this.touchY);
            }
        }
    }

    getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
     }


     didStart() {

     	this.currentItem = []
     }
     didDoing(x, y){
     	const pos = {x, y}
		if(pos.x!==this.prev.x|| pos.y!==this.prev.y) {

			this.currentItem.push(pos)
			this.prev = pos
			this.drawCircle(pos.x, pos.y)
		}
     }

     didDone() {
     	this.store.addUndoItem(this.currentItem)
		this.currentItem = []
		ga('send', 'event', 'handwrite', 'wrote a line');
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







	drawCircle(x, y) {
		Circle(this.ctx, x, y, this.store.brush, this.color)
	}


	startOver() {
		this.store.starOver()
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}


}

export default Capture