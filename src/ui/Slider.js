import React, { PropTypes } from 'react';
import styles from './Slider.css'
import { observer, inject} from "mobx-react"


@inject('store') @observer
class Slider extends React.Component {


  	sliderChanged(e) {

		this.props.store[this.props.storeProp] = parseInt(e.target.value, 10)


		if(this.props.onCallback) {
			this.props.onCallback()
		}


	}

  	render() {
  		const storeProp = this.props.store[this.props.storeProp]
		return (
	  		<div className={styles.main}>
				<div>{this.props.children} <span>{storeProp}</span></div>
				<input type="range" className={styles.brushSize} onChange={this.sliderChanged.bind(this)} value={storeProp} min={this.props.min} max={this.props.max} />
			</div>
		);
  	}

}


Slider.propTypes = {
	min: React.PropTypes.number.isRequired,
	max: React.PropTypes.number.isRequired
};


export default Slider;
