'use strict';
import React from 'react';

import Login from './login/login';
import List from './list/list';
//import {Annunci} from './data.js';
import {Backend} from './../backend';
import {Store} from './../store';
import NewItem from './new_item/new_item';
import Spinner from './common/spinner';
import Topbar from './appbar/topbar';
import Bottombar from './appbar/bottombar';
import Single from './single-item/single-item';
import Profile from './profile/profile';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
		this.state={
			logged:false,
            annunci:[],
            annuncio:[]
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
	makeLogin(){
        //Store.set({ loggedin: 'true'});
		this.setState({
			logged:!this.state.logged,
			activePage:'login',
			postCategory:[],
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
	goToPage(page){
		this.setState({
			activePage: page
		})
		console.log(page);
	}

	render(){
		if(this.state.logged){
            Backend.getAnnunci()
            .then((data)=>{
                this.setState({
                    annunci:data
                })
            })
			var contentElem= <Spinner/>
			if(this.state.annunci){
				contentElem = <List annunci={this.state.annunci} goToPage={this.goToPage.bind(this)}/>
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
			if(this.state.activePage.includes('Single|')){
				contentElem= <Spinner/>
				const postP = this.state.activePage.split('|');
                Backend.getAnnuncio(postP[1])
                .then((data)=>{
                    this.setState({
                        annuncio:data
                    })
                })

				Backend.getCategory()
				.then((data)=>{
					this.setState({
						postCategory:data
					})
				})

                //se rimuovo l'if ci mettono un po', da sistemare (se lo lascio errori in console)
                if(this.state.annuncio.length!=0){
                    Backend.getUserInfo(this.state.annuncio.author)
    				.then((data)=>{
    					this.setState({
    						author:data
    					})
    				})

                    Backend.getCurrentCategoryName(this.state.annuncio.tags)
    				.then((data)=>{
    					this.setState({
    						currentCat:data
    					})
    				})
                }

				if(this.state.annuncio.length!=0 && this.state.postCategory.length!=0 && this.state.author.length!=0 && this.state.currentCat.length!=0){
                    contentElem= <Single id={postP[1]} annuncio={this.state.annuncio} categoryList={this.state.postCategory} userId="6" currCat={this.state.currentCat.name} author={this.state.author} />
                }
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
