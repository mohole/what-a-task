'use strict';
import React from 'react';
import Profile from './profile';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
    }
	render(){
        return(
            <section>
			<Profile />
			</section>
        )
    }
}
