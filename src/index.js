import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "mobx-react"

import store from './Store.js'




ReactDOM.render(
	<Provider store={store}>
  		<App/>
  	</Provider>,
  	document.getElementById('root')
);
