import React, { PropTypes } from 'react';
import styles from './Render.css'
import { observer, inject } from "mobx-react"
// import Handwrite from './helpers/Hand.js'
import Handwrite from 'handwrite'
import HandwriteReact from './HandwriteReact.js'

var Highlight = require('react-highlight');
import Slider from './ui/Slider.js'
var Prism = require('prismjs');
import './prism-funky.css'


const pointsList = [{"x":4,"y":50},{"x":5,"y":47},{"x":5,"y":43},{"x":5,"y":39},{"x":5,"y":33},{"x":5,"y":30},{"x":5,"y":27},{"x":5,"y":25},{"x":5,"y":22},{"x":7,"y":20},{"x":7,"y":19},{"x":7,"y":17},{"x":7,"y":16},{"x":7,"y":15},{"x":7,"y":14},{"x":7,"y":13},{"x":7,"y":12},{"x":8,"y":11},{"x":9,"y":10},{"x":10,"y":10},{"x":11,"y":11},{"x":12,"y":14},{"x":13,"y":18},{"x":14,"y":21},{"x":15,"y":26},{"x":16,"y":29},{"x":17,"y":34},{"x":18,"y":38},{"x":19,"y":40},{"x":20,"y":41},{"x":20,"y":42},{"x":21,"y":42},{"x":21,"y":40},{"x":22,"y":38},{"x":25,"y":34},{"x":26,"y":29},{"x":28,"y":25},{"x":29,"y":22},{"x":31,"y":19},{"x":32,"y":15},{"x":32,"y":14},{"x":33,"y":13},{"x":33,"y":12},{"x":34,"y":12},{"x":35,"y":12},{"x":36,"y":15},{"x":38,"y":20},{"x":41,"y":25},{"x":44,"y":32},{"x":46,"y":38},{"x":48,"y":44},{"x":48,"y":49},{"x":49,"y":52},{"x":49,"y":54},{"x":49,"y":55},{"x":50,"y":57},{"x":4,"y":50},{"x":5,"y":47},{"x":5,"y":43},{"x":5,"y":39},{"x":5,"y":33},{"x":5,"y":30},{"x":5,"y":27},{"x":5,"y":25},{"x":5,"y":22},{"x":7,"y":20},{"x":7,"y":19},{"x":7,"y":17},{"x":7,"y":16},{"x":7,"y":15},{"x":7,"y":14},{"x":7,"y":13},{"x":7,"y":12},{"x":8,"y":11},{"x":9,"y":10},{"x":10,"y":10},{"x":11,"y":11},{"x":12,"y":14},{"x":13,"y":18},{"x":14,"y":21},{"x":15,"y":26},{"x":16,"y":29},{"x":17,"y":34},{"x":18,"y":38},{"x":19,"y":40},{"x":20,"y":41},{"x":20,"y":42},{"x":21,"y":42},{"x":21,"y":40},{"x":22,"y":38},{"x":25,"y":34},{"x":26,"y":29},{"x":28,"y":25},{"x":29,"y":22},{"x":31,"y":19},{"x":32,"y":15},{"x":32,"y":14},{"x":33,"y":13},{"x":33,"y":12},{"x":34,"y":12},{"x":35,"y":12},{"x":36,"y":15},{"x":38,"y":20},{"x":41,"y":25},{"x":44,"y":32},{"x":46,"y":38},{"x":48,"y":44},{"x":48,"y":49},{"x":49,"y":52},{"x":49,"y":54},{"x":49,"y":55},{"x":50,"y":57},{"x":69,"y":51},{"x":69,"y":49},{"x":70,"y":46},{"x":72,"y":43},{"x":74,"y":38},{"x":76,"y":33},{"x":78,"y":27},{"x":81,"y":21},{"x":82,"y":17},{"x":85,"y":14},{"x":87,"y":12},{"x":88,"y":10},{"x":88,"y":9},{"x":89,"y":9},{"x":90,"y":11},{"x":92,"y":14},{"x":94,"y":18},{"x":97,"y":22},{"x":100,"y":27},{"x":103,"y":33},{"x":106,"y":41},{"x":107,"y":46},{"x":108,"y":51},{"x":108,"y":52},{"x":108,"y":53},{"x":109,"y":54},{"x":109,"y":53},{"x":109,"y":52},{"x":109,"y":49},{"x":69,"y":51},{"x":69,"y":49},{"x":70,"y":46},{"x":72,"y":43},{"x":74,"y":38},{"x":76,"y":33},{"x":78,"y":27},{"x":81,"y":21},{"x":82,"y":17},{"x":85,"y":14},{"x":87,"y":12},{"x":88,"y":10},{"x":88,"y":9},{"x":89,"y":9},{"x":90,"y":11},{"x":92,"y":14},{"x":94,"y":18},{"x":97,"y":22},{"x":100,"y":27},{"x":103,"y":33},{"x":106,"y":41},{"x":107,"y":46},{"x":108,"y":51},{"x":108,"y":52},{"x":108,"y":53},{"x":109,"y":54},{"x":109,"y":53},{"x":109,"y":52},{"x":109,"y":49},{"x":81,"y":34},{"x":84,"y":34},{"x":91,"y":34},{"x":96,"y":31},{"x":100,"y":31},{"x":101,"y":30},{"x":81,"y":34},{"x":84,"y":34},{"x":91,"y":34},{"x":96,"y":31},{"x":100,"y":31},{"x":101,"y":30}]

@inject('store') @observer
class Render extends React.Component {

	constructor(p) {
		super(p)
		this.state = {imageSize:{width:0, height:0}, test:1}
	}

	imageLoaded(e) {
		this.setState({imageSize:{width:e.target.width, height:e.target.height}})
	}

	draw() {
		this.refs.handwriteReact.draw()
		// this.handwrite = new Handwrite(this.refs.canvas, this.refs.img)
		// this.handwrite.draw(this.props.store.points, {brushSize: this.props.store.brush, fps:this.props.store.speed})
	}

	onSpeed() {
		// this.refs.handwriteReact.draw()
	}

	createMarkup() {
		const code =
`npm install -S handwrite;

import Handwrite from 'handwrite';

const handwrite = new Handwrite(myCanvas, myImg);
const handwrite.draw(looooooongArray, {brushsize:5, speed:3, repeat:0, callback});`

	const html = Prism.highlight(code, Prism.languages.javascript)


	return {__html:html}


	}

  	render() {
  		const {brush, image, points, speed} = this.props.store








		return (
	  		<div className={styles.main} >
	  			<h3>Preview Masking effects using handwrite.js</h3>



				<HandwriteReact
	  				ref="handwriteReact"
	  				image={image}
	  				points={points}
	  				speed={speed}
	  				brushSize={brush}
	  				repeat={0}
	  			/>


				<Slider min={1} max={10} storeProp='brush'>Brush Size:</Slider>
				<Slider min={1} max={30} storeProp='speed' onCallback={this.onSpeed.bind(this)}>Speed:</Slider>

				<div className={styles.code}>
					<pre>
						<code
							className="language-javascript"
							dangerouslySetInnerHTML={this.createMarkup()}>
						</code>
					</pre>
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

