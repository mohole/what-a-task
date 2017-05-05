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
			searchArgs:{},
			type:5
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
				search:this.state.searchTerm,
				category:this.state.type
			}
		})
	}
	checkType(evt){
		const input = parseInt(evt.target.value);
		this.setState({
            type : input
        });
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
					<div className="mui-col-xs-12">
						<div className="mui-select">
							<select onChange={this.getCat.bind(this)}>
							<option value="0" >Categoria</option>
								{catList}
							</select>
						</div>
						<div className="mui-radio">
							<input type="radio" name="tipologia" onChange={this.checkType.bind(this)} checked={this.state.type===5} value="5"/> <span>Offro</span> <input type="radio" name="tipologia" onChange={this.checkType.bind(this)} checked={this.state.type===3} value="3"/> <span>Cerco</span>
						</div>
						<div className="mui-textfield">
							<input name="searchTerm" type="text" placeholder="cosa cerchi" value={this.state.searchTerm} onChange={this.writing.bind(this)}/>
						</div>
						<div className="mui-textfield">
							<button type="button" className="mui-btn mui-btn--primary" onClick={this.searchItem.bind(this)}>CERCA</button>
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