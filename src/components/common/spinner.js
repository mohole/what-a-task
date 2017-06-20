'use strict';
import React from 'react';

export default class Spinner extends React.Component{
    constructor(){
        super();
        console.log('spinner');
    }
	render(){
		return(
			<section className="spinner"><div className="vertical-center rotating inner-spinner"><i className="ion-load-c"></i></div></section>
		)

    }
}
