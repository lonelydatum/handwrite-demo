import React, { PropTypes } from 'react';
import styles from './ToggleButton.css'



class ToggleButton extends React.Component {
  	constructor(props) {
		super(props);
  	}

  	onToggle() {
  		this.props.onToggle(!this.props.onoff)
  	}

  	render() {
  		console.log(this.props.onoff);
		return (
	  		<button className={styles.main} onClick={this.onToggle.bind(this)}>
  			{
  				this.props.onoff ? 'Show Render' : 'Show drawing'
  			}
	  		</button>
		);
  	}

}



ToggleButton.propTypes = {
	onoff: React.PropTypes.bool.isRequired
};


export default ToggleButton;

