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
				<div id="user-search-bar">
					<div className="form col-xs-12">
						<div className="form-group">
							<input className="form-control" name="searchTerm" type="text" placeholder="chi cerchi" value={this.state.searchTerm} onChange={this.writing.bind(this)}/>
						</div>
						<div className="form-group">
							<button type="button" className="btn btn-primary btn-block" onClick={this.searchUser.bind(this)}>CERCA</button>
						</div>
					</div>
				</div>
			</section>
        )
    }
}