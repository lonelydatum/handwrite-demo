import React, { PropTypes } from 'react';
import styles from './HandwriteReact.css'

import Handwrite from 'handwrite'



class HandwriteReact extends React.Component {


	componentDidMount() {

	}

	imageLoaded() {



		this.refs.canvas.width = this.refs.img.width
		this.refs.canvas.height = this.refs.img.height

		this.handwrite = new Handwrite(this.refs.canvas, this.refs.img)
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
		// console.log({speed, brushSize, repeat});
		this.handwrite.draw(this.props.points, {speed, brushSize, repeat, callback:this.callback.bind(this)})
	}

	callback() {
		this.handwrite.onDone()
		this.handwrite.render()
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

