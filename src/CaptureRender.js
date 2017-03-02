import React, { PropTypes } from 'react';
import styles from './CaptureRender.css'
import { observer, inject } from "mobx-react"
import Capture from './Capture.js'
import Render from './Render.js'


@inject('store') @observer
class CaptureRender extends React.Component {

	constructor(p) {
		super(p)
		this.state = {height:0, showRender:false}
	}

	getHeight(height) {
		this.setState({height})
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(this.state.showRender);
	}



  	render() {
  		const deg = this.props.showRender ? 180 : 0
  		const height = this.props.isMobile ? this.state.height : 'initial'
  		const css = {height, transform: `rotateY(${deg}deg)`}
  		const {image} = this.props.store

  		// console.log(image);
  		if(image) {

  		}
		return (
			<div className={styles.flipcontainer} id="captureRender">
		  		<div className={styles.main} style={css}>
		  			<Capture getHeight={this.getHeight.bind(this)}/>
		  			<Render setHeight={this.state.height} />
		  			<div className={styles.cover}>
		  				<i className="fa fa-lock" aria-hidden="true"></i>
		  			</div>
		  		</div>

	  		</div>
		);
  	}

}



CaptureRender.propTypes = {
	showRender: React.PropTypes.bool.isRequired
};


export default CaptureRender;

