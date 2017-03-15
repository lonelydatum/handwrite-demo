import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import styles from './App.css';

import CaptureRender from './CaptureRender.js'
import DropFile from './DropFile.js'
import ToggleButton from './ToggleButton.js'
import About from './About.js'
import Demo from './Demo.js'
import {checkMQ} from './helpers/Helper.js'


import TweenLite from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin";


@inject('store') @observer
class App extends Component {

	constructor(p) {
		super(p)
		this.state = {isMobile:checkMQ(), showRender:false}



	}



	onToggle(onoff) {
		this.setState({showRender:onoff})
	}

	componentDidMount() {
		// window.onresize = ()=>{
		// 	this.setState({isMobile:this.checkMQ()})
		// }
		this.hasImage(this.props.store.image)


	}

	hasImage(image) {
		const dom = this.refs.captureRender

		if( dom ){
			let y = image ? dom.offsetTop : 0
			TweenLite.to(window, 1, {scrollTo:y , delay:.5})
		}
	}

  	render() {
  		this.hasImage(this.props.store.image)
	    return (
			<div className={styles.main}>
				<div className={styles.page1}>
					<About />
					<DropFile />
					<Demo />
				</div>
				<div ref="captureRender">
					<CaptureRender showRender={this.state.showRender} isMobile={this.state.isMobile} />
				</div>
			</div>
	    );
  	}
}

export default App;

// {
// 					this.state.isMobile ? <ToggleButton onoff={this.state.showRender} onToggle={this.onToggle.bind(this)}/> : null
// 				}