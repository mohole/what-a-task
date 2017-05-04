'use strict';
import React from 'react';
import UserSearchBar from './userSearchBar';
export default class Bottombar extends React.Component{
    constructor(){
        super();
        console.log('bottombar started');
		this.state = {
			userSearchActive:false
		}
    }
	activeSearch(evt){
		console.log('search user is active '+this.state.userSearchActive);
		
		this.setState({
			userSearchActive:!this.state.userSearchActive
		})
	}
	render(){
		if(this.state.userSearchActive){
			var userSearch = <UserSearchBar/>
		}
        return(
            <section>
			<div className="bottom-bar-wrapper">
				<div className="top-inner">
					<div className="col-xs-4">
						<button className="btn btn-primary" onClick={this.activeSearch.bind(this)}><i className="fa fa-search"></i></button>
					</div>
					<div className="col-xs-4 text-center">
						<button className="btn btn-primary"><i className="fa fa-user"></i></button>
					</div>
					<div className="col-xs-4 text-right">
						<button className="btn btn-primary"><i className="fa fa-cog"></i></button>
					</div>
				</div>
			</div>
			{userSearch}
			</section>
			
        )
    }
}