'use strict';
import React from 'react';

export default class List extends React.Component{
    constructor(){
        super();
        console.log('app started');    
    }
	render(){
        return(
            <section>
            <h3>Titolo</h3>
			<p>testo testo testo testo testo testo testo</p>
			</section>
        )
    }
}