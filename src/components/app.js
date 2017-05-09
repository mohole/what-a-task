'use strict';
import React from 'react';

import Login from './login/login';
import List from './list/list';
import {Annunci} from './data.js';
import {Backend} from './../backend';
import {Store} from './../store';
import Single from './single-item/single-item';
import EditItem from './single-item/edit-item';
import NewItem from './new_item/new_item';
import Spinner from './common/spinner';
import Topbar from './appbar/topbar';
import Bottombar from './appbar/bottombar';
import Profile from './profile/profile';
import ModifyProfile from './profile/modify_profile';
export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
		this.state={
			logged:false,
		}
		
		Backend.getCategory()
		.then((data)=>{
			this.setState({
				postCategory:data
			})
		})
    }
	postAnnuncio(annuncio){
		Backend.postAnnuncio(annuncio);
	}
	hasCategory(){
		if(this.state.postCategory.length!=0){
			return(
				<section>
					<NewItem categoryList={this.state.postCategory}/>
				</section>
			)
		}
		else{
			return
				<section>NO</section>
		}
		
	}
	makeLogin(){
		this.setState({
			logged:!this.state.logged,
			postCategory:[],
			annunci: Annunci,
			newItem:{},
			title:'titolo',
			text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae odit, ad nobis inventore neque. Atque cum voluptate tempora debitis!',
			image:'http://lorempixel.com/640/360',
			cat:[
				{
					_id:1,
					name:'cat1'
				},
				{
					_id:2,
					name:'cat2'
				},
				{
					_id:3,
					name:'cat3'
				},
				{
					_id:4,
					name:'cat4'
				},
			],
			ClassNameTitle:'form-group mui-textfield',
			ClassNameText:'form-group mui-textfield',
			ClassNamePrivacy:'form-group mui-checkbox',
			ClassNameCategory:'form-group mui-select',
			selectedCat:0,
			type:'offro',
			privacyCheck:false
		})
		console.log('load app state');
	}
	render(){
		if(this.state.logged){
			if(this.state.annunci){
				return(
					<section>
						<Topbar/>
						<List annunci={this.state.annunci}/>
						<Bottombar/>
					</section>
				)
			}else{
				return(
					<section>
						<Topbar/>
						<Spinner/>
						<Bottombar/>
					</section>
				)
			}
		}else{
			return(
				<section>
					<Login makeLogin={this.makeLogin.bind(this)}/>
				</section>
			)	
		}
    }
}