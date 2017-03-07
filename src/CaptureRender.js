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
	}



  	render() {




  		const deg = this.props.showRender ? 180 : 0
  		const height = this.props.isMobile ? this.state.height : 'initial'
  		const css = {transform: `rotateY(${deg}deg)`}
  		const {image, points, isMobile} = this.props.store

  		let cover = image ? styles.coverShowCapture : styles.cover

  		if(image) {
  			if(points.length > 1) {
  				cover = styles.coverShowAll
  			}else{
  				cover = styles.coverShowCapture
  			}
  		}else{
  			cover = styles.cover
  		}

  		let coverSuper = {}
  		if(isMobile) {
  			console.log(this.state.height);
  			coverSuper = {...coverSuper, top:this.state.height}
  		}






		return (
			<div className={styles.flipcontainer} id="captureRender">
		  		<div className={styles.main} style={css}>
		  			<Capture ref="capture" getHeight={this.getHeight.bind(this)}/>
		  			<Render setHeight={this.state.height} />
		  			<div style={coverSuper} className={cover}>
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

