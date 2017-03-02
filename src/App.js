import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import styles from './App.css';

import CaptureRender from './CaptureRender.js'
import DropFile from './DropFile.js'
import ToggleButton from './ToggleButton.js'
import About from './About.js'

import ScrollToPlugin from "gsap/ScrollToPlugin";
import TweenLite from 'gsap'


@inject('store') @observer
class App extends Component {

	constructor(p) {
		super(p)
		this.state = {isMobile:this.checkMQ(), showRender:false}


	}

	checkMQ() {
		return !window.matchMedia( "(min-width: 700px)" ).matches;
	}

	onToggle(onoff) {
		this.setState({showRender:onoff})
	}

	componentDidMount() {
		window.onresize = ()=>{
			this.setState({isMobile:this.checkMQ()})
		}
		this.hasImage()
	}

	hasImage() {
		if(this.props.store.image){
			const dom = document.getElementById('captureRender')
			console.log(dom.offsetTop);
			TweenLite.to(window, 1, {scrollTo: dom.offsetTop})
		}
	}

  	render() {




	    return (
			<div className={styles.main}>
				<div className={styles.page1}>
					<About />
					<DropFile />
				</div>

				<CaptureRender ref="captureRender" showRender={this.state.showRender} isMobile={this.state.isMobile} />
			</div>
	    );
  	}
}

export default App;

// {
// 					this.state.isMobile ? <ToggleButton onoff={this.state.showRender} onToggle={this.onToggle.bind(this)}/> : null
// 				}