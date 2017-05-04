'use strict';
import React from 'react';
import {Backend} from './../backend';
import NewItem from './new_item/new_item'
import Spinner from './common/spinner';
import Topbar from './appbar/topbar';
import Bottombar from './appbar/bottombar';

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

  hasCategory(){
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
	render(){
  return(
      <section>
				<Topbar/>
				<Bottombar/>
  			<Spinner/>
        {hasCategory}
			</section>
        )
    }
}
