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
	closeS(){
		this.setState({
			searchIsActive:false
		})
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
			var topSearchBar = <ItemSearchBar goToPage={this.props.goToPage.bind(this)} categoryList={this.state.postCategory} closeS={this.closeS.bind(this)}/>
		}
		let btnTop;
		if(this.props.pageNow=='List'){
			btnTop= <button onClick={()=>{this.props.goToPage('NewItem')}} className="top-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab button-plus"><i className="icon-big ion-plus-round"></i></button>
		}else{
			btnTop = <button onClick={()=>{this.props.goToPage(this.props.backTo)}} className="top-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab"><i className="icon-big ion-ios-arrow-left"></i></button>
		}
        return(
            <section>
			<div className="top-bar-wrapper">
				<div className="top-inner">
					<div className="mui-col-xs-3">
						{btnTop}
					</div>
					<div className="main-title mui-col-xs-6">
					  <span>WHAT A TASK</span>
					</div>
					<div className="mui-col-xs-3 align-right">
						<button id="search" className="top-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab" onClick={this.activeSearch.bind(this)}><i className="icon ion-ios-search" ></i></button>
					</div>
				</div>
			</div>
			{topSearchBar}
			</section>
        )
    }
}
