'use strict';
import React from 'react';
import List  from './list';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');    
    }
	render(){
        return(
            <section>
			<List />
			</section>
        )
    }
}