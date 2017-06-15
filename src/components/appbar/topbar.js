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
		let btnTop;
		if(this.props.pageNow=='List'){
			btnTop= <button onClick={()=>{this.props.goToPage('NewItem')}} className="top-bar-button mui-btn mui-btn--small mui-btn mui-btn--fab"><i className="icon ion-ios-plus-empty"></i></button>
		}else{
			btnTop = <button onClick={()=>{this.props.goToPage(this.props.backTo)}} className="mui-btn mui-btn--flat"><i className="icon-big ion-ios-arrow-left"></i></button>
		}
        return(
            <section>
			<div className="top-bar-wrapper">
				<div className="top-inner">
					<div className="mui-col-xs-4">
						{btnTop}	
					</div>
					<div className="main-title mui-col-xs-4">
					  <span>WHAT A TASK</span>
					</div>
					<div className="mui-col-xs-4 align-right">
						<button id="search" className="mui-btn mui-btn--flat" onClick={this.activeSearch.bind(this)}><i className="icon ion-ios-search"></i></button>
					</div>
				</div>
			</div>
			{topSearchBar}
			</section>
        )
    }
}
