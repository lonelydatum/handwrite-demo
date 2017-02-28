import React, { PropTypes } from 'react';
import styles from './DropFile.css'
import { observer, inject } from "mobx-react"

var Dropzone = require('react-dropzone');


@inject('store') @observer
class DropFile extends React.Component {
  	constructor(props) {
		super(props);

  	}

    onDropHandler(files) {

      var file = files[0]
      const reader = new FileReader();
      reader.onload = (event) => {
        this.props.store.image = event.target.result
      };


      reader.readAsDataURL(file);
    }


  	render() {

		return (
	  		<div
	  			ref="main"
	  			className={styles.main}
	  		>
	  			<Dropzone onDrop={this.onDropHandler.bind(this)} className={styles.dropzone} activeClassName={styles.gar}>
            {({ isDragActive, isDragReject }) => {
              if (isDragActive) {
                return "This file is authorized";
              }

              if (isDragReject) {
                return "This file is not authorized";
              }

              return "Drop An Image Here";
            }}
          </Dropzone>
	  		</div>
		);
  	}

}



DropFile.propTypes = {

};


export default DropFile;

// import Signals from 'signals'

// class DragFile {
// 	constructor(dom) {
// 		this.signals = {
// 			imageReady: new Signals()
// 		}
// 		var holder = dom
// 		holder.ondragleave = function () { this.className = ''; return false; };
// 		holder.ondragover = function () { this.className = 'hover'; return false; };
// 		holder.ondragend = function () { this.className = ''; return false; };
// 		holder.ondrop = this.onDrop.bind(holder, this)
// 	}

// 	onDrop(scope, e) {
// 		this.className = '';
// 		e.preventDefault();

// 		var file = e.dataTransfer.files[0]
// 		const reader = new FileReader();
// 		reader.onload = (event) => {
// 			scope.signals.imageReady.dispatch(event.target.result)
// 		};


// 		reader.readAsDataURL(file);
// 		return false;

// 	}


// }

// export default DragFile