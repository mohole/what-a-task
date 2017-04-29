'use strict';
import React from 'react';
import Spinner from './common/spinner';
export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
    }
	render(){
		return(
			<Spinner/>
		)
    }
}