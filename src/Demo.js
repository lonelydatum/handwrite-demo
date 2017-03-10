import React, { PropTypes } from 'react';
import { observer, inject } from "mobx-react"
import styles from './Demo.css'


@inject('store') @observer
class Demo extends React.Component {
  	constructor(props) {
		super(props);
  	}

	toDataUrl(img) {
		console.log(img);
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		dataURL = canvas.toDataURL();
		return dataURL
	}

  	selected(e) {
  		this.props.store.image = this.toDataUrl(e.target)
  	}

  	render() {
		return (
	  		<div className={styles.main}>
	  			<h3>Don't have an image? Try one of these:</h3>
	  			<div className={styles.images}>
	  				<div className={styles.imageItem}>
	  					<img onClick={this.selected.bind(this)} src="text___family.png" />
	  				</div>

					<div className={styles.imageItem}>
						<img onClick={this.selected.bind(this)} src="text___cat.png" />
					</div>

	  				<div className={styles.imageItem}>
	  					<img onClick={this.selected.bind(this)} src="text___love-korean.png" />
	  				</div>
	  			</div>
	  		</div>
		);
  	}

}



Demo.propTypes = {

};


export default Demo;

