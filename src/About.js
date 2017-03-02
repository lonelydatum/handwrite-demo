import React, { PropTypes } from 'react';
import styles from './About.css'



class About extends React.Component {
  	constructor(props) {
		super(props);
  	}

  	render() {
		return (
	  		<div className={styles.main}>
	  			<h1>Create customized masking animations</h1>
	  			<p>
	  				Looking to create an effect like handwritten animations?<br/>
	  				To start, select an image from your computer and drag and drop it below.
	  			</p>



	  		</div>
		);
  	}

}



About.propTypes = {

};


export default About;

