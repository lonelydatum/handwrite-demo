import React, { PropTypes } from 'react';
import styles from './Capture.css'
import { observer, inject } from "mobx-react"
import _ from 'lodash'
import Slider from './ui/Slider.js'

import CapturePoints from './helpers/CapturePoints.js'
import Anal from './ui/Anal.js'

@inject('store') @observer
class Capture extends React.Component {

	constructor(p) {
		super(p)
		this.state = {imageSize:{width:0, height:0}}
	}

	sliderChanged(e) {
		this.props.store.brush = e.target.value
	}

	imageLoaded(e) {
		this.setState({imageSize:{width:e.target.width, height:e.target.height}})
	}

	componentDidMount() {
		const {brush, image} = this.props.store

		// undo from key: ctr+z
		document.onkeydown = (e) => {
			var evtobj = window.event? event : e
			if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
				this.capturePoints.undo()
			}
		}

		setTimeout(()=>{
			this.props.getHeight(this.refs.main.offsetHeight)
		}, 100)
	}


	componentDidUpdate(prevProps, prevState) {
		if(!_.isEqual(prevState.imageSize, this.state.imageSize)) {
			this.capturePoints = new CapturePoints(this.refs.canvas, this.props.store)
		}
	}

	undid() {

		Anal('capture-undo')
		this.capturePoints.undo()
	}

	startOver() {
		Anal('capture-startover')
		this.capturePoints.startOver()
	}

  	render() {
  		const {brush, image, points} = this.props.store

		return (
	  		<div ref="main" className={styles.main}>
	  			<div className={styles.content}>
		  			<h3 className={styles.title}>Start by tracing over the image you selected.</h3>

					<div className={styles.holder} style={{...this.state.imageSize}}>
						<img className={styles.checker} src="./checker.png" />
						<img ref="img" className={styles.captureImage} onLoad={this.imageLoaded.bind(this)} src={this.props.store.image} />
						<canvas
							className={styles.canvas}
							ref="canvas"
							width={this.state.imageSize.width}
							height={this.state.imageSize.height}>
						</canvas>
					</div>



					<Slider
						min={{value:1, label:'small brush(1)'}}
						max={{value:10, label:'big brush(10)'}}
						storeProp='brush'></Slider>

					<div className={styles.uiHolder}>
						<button onClick={this.undid.bind(this)} ref="undo">Undo (ctr+z)</button>
						<button onClick={this.startOver.bind(this)} ref="startOver">Start Over</button>
					</div>



					<div className={styles.points}>
						<span>looooooongArray.length = </span><span className={styles.totalPoint}>
							{points.length}
						</span>
						<textarea rows="9" readOnly value={JSON.stringify(points)} className={styles.pointsTextArea}></textarea>
					</div>


				</div>
	  		</div>
		);
  	}
}



Capture.propTypes = {
	getHeight: React.PropTypes.func.isRequired
};


export default Capture;

