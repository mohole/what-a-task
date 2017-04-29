'use strict';
import React from 'react';

export default class ItemSearchBar extends React.Component{
    constructor(props){
        super(props);
        console.log('item search started');
		this.state={
			categoryList:this.props.categoryList,
			searchTerm:'',
			selectedCat:0,
			searchArgs:{}
		}
    }
	getCat(evt){
		console.log(evt.target.value);
		this.setState({
			selectedCat:parseInt(evt.target.value)
		})
	}
	writing(evt){
        console.log('sto scrivendo');
        const input = evt.target.value;
		const elem=evt.target.getAttribute('name');
        this.setState({
            [elem] : input
        });
    }
	searchItem(){
		this.setState({
			searchArgs:{
				tags:this.state.selectedCat,
				search:this.state.searchTerm
			}
		})
	}
	render(){
		if(this.state.categoryList.lenght!=0){
			const catList = this.state.categoryList.map((e,i) =>{
				return(
					<option value={e.id} key={e.id}>{e.name}</option>
				)
			});
        return(
            <section>
				<div id="item-search-bar">
					<div className="form col-xs-12">
						<div className="form-group">
							<select className="form-control" onChange={this.getCat.bind(this)}>
							<option value="0" >Categoria</option>
								{catList}
							</select>
						</div>
						<div className="form-group">
							<input className="form-control" name="searchTerm" type="text" placeholder="cosa cerchi" value={this.state.searchTerm} onChange={this.writing.bind(this)}/>
						</div>
						<div className="form-group">
							<button type="button" className="btn btn-primary btn-block" onClick={this.searchItem.bind(this)}>CERCA</button>
						</div>
					</div>
				</div>
			</section>
        )
	}else{
		<section>spinner</section>
	}
    }
}