import React, { PropTypes } from 'react';
import styles from './Render.css'
import { observer, inject, toJS } from "mobx-react"
// import Handwrite from './helpers/Hand.js'
import Handwrite from 'handwrite'

@inject('store') @observer
class Render extends React.Component {

	constructor(p) {
		super(p)
		this.state = {imageSize:{width:0, height:0}}
	}

	imageLoaded(e) {
		this.setState({imageSize:{width:e.target.width, height:e.target.height}})

	}



	draw() {
		this.handwrite = new Handwrite(this.refs.canvas, this.refs.img)
		this.handwrite.draw(this.props.store.points, {radius: this.props.store.brush})
	}

  	render() {


  		const {brush, image, points} = this.props.store


		return (
	  		<div className={styles.main} >
	  			<h3>Preview Masking effects using handwrite.js</h3>


				<div className={styles.holder} style={{...this.state.imageSize}}>
					<img
						className={styles.renderImage}
						src={image}
						ref="img"
						onLoad={this.imageLoaded.bind(this)} />
					<canvas
						className={styles.canvas}
						ref="canvas"
						width={this.state.imageSize.width}
						height={this.state.imageSize.height}>
					</canvas>
				</div>

				<div className={styles.uiWrapper}>
					<div className={styles.uiHolder}>
						<button onClick={this.draw.bind(this)} className={styles.button}>PREVIEW ANIMATION</button>
					</div>
				</div>
	  		</div>
		);
  	}

}



Render.propTypes = {
	setHeight: React.PropTypes.number.isRequired
};


export default Render;

