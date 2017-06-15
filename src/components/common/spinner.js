'use strict';
import React from 'react';

export default class Spinner extends React.Component{
    constructor(){
        super();
        console.log('spinner');
    }
	render(){
		return(
			<section className="spinner"><i className="fa fa-spinner fa-spin"></i></section>
		)
		
    }
}