import React, { PropTypes } from 'react';
import styles from './CaptureRender.css'

import Capture from './Capture.js'
import Render from './Render.js'

class CaptureRender extends React.Component {

	constructor(p) {
		super(p)
		this.state = {height:0, showRender:false}
	}

	getHeight(height) {
		this.setState({height})
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.state.showRender);
	}



  	render() {

  		const deg = this.props.showRender ? 180 : 0
  		const height = this.props.isMobile ? this.state.height : 'initial'
  		const css = {height, transform: `rotateY(${deg}deg)`}
  		console.log(css);
		return (
			<div className={styles.flipcontainer}>
		  		<div className={styles.main} style={css}>
		  			<Capture getHeight={this.getHeight.bind(this)}/>
		  			<Render setHeight={this.state.height} />
		  		</div>
	  		</div>
		);
  	}

}



CaptureRender.propTypes = {
	showRender: React.PropTypes.bool.isRequired
};


export default CaptureRender;

