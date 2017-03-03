import React, { PropTypes } from 'react';
import styles from './HandwriteReact.css'

import Handwrite from 'handwrite'



class HandwriteReact extends React.Component {

	constructor(p) {
		super(p)
		this.state = {image: null}
	}

	componentDidMount() {
		// console.log(this.);
	}

	imageLoaded() {



		this.refs.canvas.width = this.refs.img.width
		this.refs.canvas.height = this.refs.img.height

		this.handwrite = new Handwrite(this.refs.canvas, this.refs.img)
		console.log(this);
		if(this.props.points){
			this.draw()
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const pointsChanged = this.props.points !== prevProps.points
		const speedChanged = this.props.speed !== prevProps.speed
		const brushChanged = this.props.brushSize !== prevProps.brushSize
		if(pointsChanged || speedChanged || brushChanged) {
			this.draw()
		}
	}

	draw() {
		const {speed, brushSize, repeat} = this.props

		const options = {
			speed,
			brushSize,
			repeat,
			callback:this.callback.bind(this),
			cleanFromBehind:false
		}


		// console.log(options);
		this.handwrite.draw(this.props.points, options)
	}

	callback() {
		console.log(this);
		// this.handwrite.onDone()
		// this.handwrite.render()
	}

  	render() {

		return (
	  		<div className={styles.main}>
				<img
					style={{opacity:0}}
					ref="img"
					src={this.props.image}
					onLoad={this.imageLoaded.bind(this)}
				/>
				<canvas
					ref="canvas">
				</canvas>
			</div>
		);
  	}

}



HandwriteReact.propTypes = {
	points: PropTypes.array,
	speed: PropTypes.number
};

HandwriteReact.defaultProps = {
	repeat: 1,
	brushSize: 5,
	speed:5
}


export default HandwriteReact;

