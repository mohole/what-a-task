'use strict';
import React from 'react';
import {Backend} from './../../backend';
import ItemSearchBar from './ItemSearchBar';
export default class Topbar extends React.Component{
    constructor(){
        super();
        console.log('topbar started');
		this.state={
			searchIsActive:false,
			postCategory:[]
		}
    }
	activeSearch(evt){
		console.log('search is active '+this.state.searchIsActive);

		Backend.getCategory()
		.then((data)=>{
			this.setState({
				postCategory:data
			})
		}).then(()=>{
			this.setState({
				searchIsActive:!this.state.searchIsActive
			})
		})
	}
	render(){
		if(this.state.searchIsActive){
			var topSearchBar = <ItemSearchBar categoryList={this.state.postCategory}/>
		}
        return(
            <section>
			<div className="top-bar-wrapper">
				<div className="top-inner">
					<div className="col-xs-4">
						<a href="#" className="btn btn-primary"><i className="fa fa-plus"></i></a>
					</div>
					<div className="col-xs-4 text-center">WAT</div>
					<div className="col-xs-4">
						<button id="search" className="btn btn-primary" onClick={this.activeSearch.bind(this)}><i className="fa fa-search"></i></button>
					</div>
				</div>
			</div>
			{topSearchBar}
			</section>
        )
    }
}
