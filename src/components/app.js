'use strict';
import React from 'react';
import NewItem from './new_item/new_item'
export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
		this.state={
			postCategory:[
				{
					_id:1,
					name:'cat1'
				},
				{
					_id:2,
					name:'cat2'
				},
				{
					_id:3,
					name:'cat3'
				},
				{
					_id:4,
					name:'cat4'
				},
			]
		}
    }
	render(){
        return(
            <section>
			<NewItem categoryList={this.state.postCategory}/>
			</section>
        )
    }
}