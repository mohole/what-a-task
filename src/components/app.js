'use strict';
import React from 'react';
import {Backend} from './../backend';
import NewItem from './new_item/new_item'
export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');

		this.state={
			postCategory:[]
		}

		Backend.getCategory()
		.then((data)=>{
			this.setState({
				postCategory:data
			})
		})	
    }
	postAnnuncio(annuncio){
		Backend.postAnnuncio(annuncio);
	}
	render(){
		if(this.state.postCategory.length!=0){
			return(
				<section>
				<NewItem categoryList={this.state.postCategory}/>
				</section>
			)
		}
		else{
			return(
				<section>NO</section>
			)
		}
    }
}