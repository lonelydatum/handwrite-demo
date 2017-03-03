import React from 'react';
import styles from './DropFile.css'
import { observer, inject } from "mobx-react"
import HandwriteReact from './HandwriteReact.js'
var Dropzone = require('react-dropzone');

import points from './helpers/points.js'

import TweenLite from 'gsap'
// import ScrollToPlugin from "gsap/ScrollToPlugin";



// console.log(TweenMax);

// import {TweenMax, Power2, TimelineLite} from "gsap";

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


    componentDidMount() {
      const dom = this.refs
      console.log(dom);
    }

  	render() {

		return (
	  		<div
	  			ref="main"
	  			className={styles.main}
	  		>

	  			<Dropzone onDrop={this.onDropHandler.bind(this)} className={styles.dropzone} activeClassName={styles.active}>
            {({ isDragActive, isDragReject }) => {
              if (isDragActive) {
                return "Drop the image here and you're good to go.";
              }

              if (isDragReject) {
                return "This file is not authorized";
              }

              return (
 <div className={styles.stateOut}>
                  <HandwriteReact
                    ref="handwriteReact"
                    image={'./text___drop-an-image-here.png'}
                    points={points}
                    speed={1}
                    brushSize={6}
                    repeat={0}
                  />
                  <p className={styles.pictures}>
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                  </p>
                </div>
              )

            }}
          </Dropzone>
	  		</div>
		);
  	}

}




export default DropFile;

