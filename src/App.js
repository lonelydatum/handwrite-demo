import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import styles from './App.css';

import CaptureRender from './CaptureRender.js'
import DropFile from './DropFile.js'
import ToggleButton from './ToggleButton.js'




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
	}

  	render() {
	    return (
			<div className={styles.main}>
				<DropFile />
				{
					this.state.isMobile ? <ToggleButton onoff={this.state.showRender} onToggle={this.onToggle.bind(this)}/> : null
				}
				<CaptureRender showRender={this.state.showRender} isMobile={this.state.isMobile} />
			</div>
	    );
  	}
}

export default App;


// {
// 						(this.state.isMobile) ? <button onClick={this.showRender.bind(this)}>Show Render</button> : null
// 					}