'use strict';
import React from 'react';
import UserSearchBar from './userSearchBar';
export default class Bottombar extends React.Component{
    constructor(props){
        super(props);
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
			var userSearch = <UserSearchBar searchUser={this.props.searchUser}/>
		}
        return(
        <section>
						<div className="bottom-bar-wrapper">
											<div className="bottom-inner">
												<div className="mui-col-xs-3 horizontal-center">
													<button className="bottom-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab" onClick={()=>{this.props.goToPage('List')}}><i className="icon ion-android-home"></i></button>
												</div>
												<div className="mui-col-xs-3 horizontal-center">
													<button id="search-profile" className="bottom-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab" onClick={this.activeSearch.bind(this)}><i className="icon ion-person-stalker"></i></button>
												</div>
												<div className="mui-col-xs-3 horizontal-center">
													<button className="bottom-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab" onClick={()=>{this.props.goToPage('Profile|'+localStorage.getItem('user_id'))}}><i className="icon ion-person"></i></button>
												</div>
												<div className="mui-col-xs-3 horizontal-center">
													<button className="bottom-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab" onClick={()=>{this.props.goToPage('Settings')}}><i className="icon ion-ios-gear"></i></button>
												</div>
											</div>
										</div>
						{userSearch}
			</section>

        )
    }
}
