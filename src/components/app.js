'use strict';
import React from 'react';
import NewItem from './new_item/new_item'
export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');    
    }
	render(){
        return(
            <section>
			<NewItem/>
			</section>
        )
    }
}