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
				<div id="item-search-bar" className="background-search-annuncio">
				  <div className="mui-container">
					<div className="mui-row">
					  <div className="mui-col-xs-12">
						<form className="mui-form">
						  <div className="mui-select">
							<select onChange={this.checkType.bind(this)}>
							  <option value="3">Cerco</option>
							  <option value="5">Offro</option>
							</select>
							<label>Tipologia dell'annuncio</label>
						  </div>
						  <div className="mui-select">
							<select onChange={this.getCat.bind(this)}>
								<option value="0" >Categoria</option>
								{catList}
							</select>
							<label>Categoria</label>
						  </div>
						  <div className="mui-textfield">
							 <input name="searchTerm" type="text" placeholder="cosa cerchi" value={this.state.searchTerm} onChange={this.writing.bind(this)}/>
							 <label>Titolo annuncio</label>
						   </div>
						  <button type="submit" className="my-button mui-col-xs-12 mui-btn mui-btn--danger" onClick={this.searchItem.bind(this)}>CERCA</button>
						</form>
					  </div>

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

