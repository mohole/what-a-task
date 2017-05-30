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
				logged:false
			}
		if(window.localStorage.getItem('token')){
			console.log(window.localStorage.getItem('token'));
			this.getLogin();
		}else{
			console.log('no storage');			
		}
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
	getLogin(){
		this.state={
			logged:true,
			activePage:'List',
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
		}
	}
	makeLogin(){
		this.setState({
			logged:true,
			activePage:'List',
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
		});
		console.log('load app state');
	}
	goToPage(page){
		this.setState({
			activePage: page
		})
		console.log(page);
	}
	render(){
		if(this.state.logged){
			var contentElem= <Spinner/>
			if(this.state.annunci){
				contentElem = <List annunci={this.state.annunci}/>
			}
			if(this.state.activePage=='NewItem'){
				contentElem= <Spinner/>
				Backend.getCategory()
				.then((data)=>{
					this.setState({
						postCategory:data
					})
				})
				if(this.state.postCategory.length!=0){
					contentElem = <NewItem categoryList={this.state.postCategory}/>
				}
			}
			if(this.state.activePage=='Profile'){
				contentElem= <Spinner/>
					contentElem = <Profile first_name= 'Tiziano' last_name= 'Borgato' avatar_urls= 'http://lorempixel.com/200/200' email= 'tiziano.borgato@gmail.com' description= 'Sono uno studente del secondo anno di Web & Apps. Per maggiori info contattatemi al 334 1301904' />
			}
            if(this.state.activePage=='Single'){
                Backend.getCategory()
                .then((data)=>{
                    this.setState({
                        postCategory:data
                    })
                })
                contentElem=
      		        <Single
                    id="1"
                    postCategory={this.state.postCategory}
                    authorId="1"
                    userId="1"
                    title="titolo"
                    category="categoria"
                    img="http://lorempixel.com/640/360"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae odit, ad nobis inventore neque. Atque cum voluptate tempora debitis!"
                    name="Nome Cognome"
                    date="18/04/2017"
                  />
            }
			return(
				<section>
					<Topbar goToPage={this.goToPage.bind(this)}/>
					{contentElem}
					<Bottombar goToPage={this.goToPage.bind(this)}/>
				</section>
			)
		}else{
			return(
				<section>
					<Login makeLogin={this.makeLogin.bind(this)}/>
				</section>
			)
		}
    }
}