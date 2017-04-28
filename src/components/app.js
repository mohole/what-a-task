'use strict';
import React from 'react';
import Login from './login/login';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');    
    }
	render(){
        return(
            <section>
			<Login/>
			</section>
        )
    }
}