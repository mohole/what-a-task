'use strict';
import React from 'react';
import {Backend} from './../../backend';
export default class UserSearchBar extends React.Component{
    constructor(props){
        super(props);
        console.log('item search started');
		this.state={
			searchTerm:''
		}
    }
	writing(evt){
        console.log('sto scrivendo');
        const input = evt.target.value;
		const elem = evt.target.getAttribute('name');
        this.setState({
            [elem] : input
        });
    }
	searchUser(){
		this.props.closeS();
		this.props.searchUser(this.state.searchTerm);
	}
	render(){
        return(
            <section>
				<div id="user-search-bar" className="background-search-utente">
				<div className="mui-container">
				  <div className="mui-row">
					<div className="mui-col-xs-12">
					  <form className="mui-form--inline">
						<div className="mui-textfield">
						 <input name="searchTerm" type="text" placeholder="chi cerchi" value={this.state.searchTerm} onChange={this.writing.bind(this)}/>
						</div>
						<button className="mui-btn mui-col-xs-12" onClick={this.searchUser.bind(this)} type="button">CERCA</button>
					  </form>
					</div>

				  </div>
				</div>
			  </div>
			</section>
        )
    }
}