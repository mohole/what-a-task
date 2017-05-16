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
			logged:false
		}
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

            Backend.getAnnunci()
            .then((data)=>{
                this.setState({
                    annunci:data
                })
            })

		this.setState({
			logged:!this.state.logged,
			activePage:'login',
            annunci:[],
			postCategory:[]
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
			var contentElem= <Spinner/>
			if(this.state.annunci.length!=0){
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
                console.log('single');
				contentElem= <Spinner/>
				const postP = this.state.activePage.split('|');

				Backend.getCategory()
				.then((data)=>{
                    //console.log('getCategory');
					this.setState({
						postCategory:data
					})
				})

                if(this.state.annunci.length!=0){
                    const a = this.state.annunci.filter((e)=>{
                        return e.id==postP[1];
                    });
                    //console.log('a[0].author: '+a[0].author);
                    const authorId=a[0].author;
                    Backend.getUserInfo(authorId)
    				.then((data)=>{
                        //console.log('setting author with id: '+a[0].author);
    					this.setState({
    						author:data
    					})
                        //console.log('author set to: '+this.state.author.name);
    				});

                    Backend.getCurrentCategoryName(a[0].tags)
    				.then((data)=>{
    					this.setState({
    						currentCat:data
    					})
    				})

    				if(this.state.postCategory.length!=0 && this.state.author && this.state.currentCat.length!=0){
                        contentElem= <Single id={postP[1]} annuncio={a[0]} categoryList={this.state.postCategory} userId={6} currCat={this.state.currentCat.name} author={this.state.author} />
                    }
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
