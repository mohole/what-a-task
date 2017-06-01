'use strict';
import React from 'react';
import {Backend} from './../../backend';
import ItemSearchBar from './ItemSearchBar';
export default class Topbar extends React.Component{
    constructor(props){
        super(props);
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
					<div className="mui-col-xs-4">
						<button onClick={()=>{this.props.goToPage('NewItem')}} className="mui-btn mui-btn--primary"><i className="fa fa-plus"></i></button>
						<button onClick={()=>{this.props.goToPage('List')}} className="mui-btn mui-btn--primary"><i className="fa fa-arrow-left"></i></button>
					</div>
					<div className="mui-col-xs-4 text-center">WAT</div>
					<div className="mui-col-xs-4">
						<button id="search" className="mui-btn mui-btn--primary" onClick={this.activeSearch.bind(this)}><i className="fa fa-search"></i></button>
					</div>
				</div>
			</div>
			{topSearchBar}
			</section>
        )
    }
}
