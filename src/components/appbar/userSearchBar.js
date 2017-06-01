'use strict';
import React from 'react';

export default class UserSearchBar extends React.Component{
    constructor(){
        super();
        console.log('item search started');
		this.state={
			searchTerm:'',
			searchArgs:{}
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
		this.setState({
			searchArgs:{
				search:this.state.searchTerm
			}
		})
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
						<button className="mui-btn mui-col-xs-12" onClick={this.searchUser.bind(this)}>CERCA</button>
					  </form>
					</div>

				  </div>
				</div>
			  </div>
			</section>
        )
    }
}