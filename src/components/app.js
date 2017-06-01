'use strict';
import React from 'react';

import Login from './login/login';
import List from './list/list';
//import {Annunci} from './data.js';
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
      		annunci:[],
			postCategory:[]
		}
	}

	makeLogin(){

		Backend.getMe()
		.then((data)=>{
			console.log(data);
			localStorage.setItem('user_id', data.id );
			localStorage.setItem('user_email', data.email );
			localStorage.setItem('user_firstName', data.first_name);
			localStorage.setItem('user_lastName', data.last_name);
			localStorage.setItem('user_description',data.description );
			localStorage.setItem('user_role',data.acf.user_role );
			localStorage.setItem('user_image',data.acf.user_image );
		})
		Backend.getAnnunci()
		.then((data)=>{
			this.setState({
				annunci:data
			})
		})

		this.setState({
			logged:true,
			activePage:'List',
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
			var contentElem = <Spinner/>
			if(this.state.activePage=='List'){
				contentElem= <Spinner/>

				if(this.state.annunci){
					contentElem = <List annunci={this.state.annunci} goToPage={this.goToPage.bind(this)}/>;
					console.log(this.state.annunci);
				}
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
					contentElem = <NewItem categoryList={this.state.postCategory} goToPage={this.goToPage.bind(this)}/>
				}
			}
      if(this.state.activePage.includes('Profile|')){
          contentElem= <Spinner/>
          const user = this.state.activePage.split('|');
          contentElem = <Profile profileId={parseInt(user[1])} currentId={localStorage.getItem('user_id')}/>
      }
			if(this.state.activePage=='Profile'){
				contentElem= <Spinner/>
				contentElem = <Profile />
			}

			if(this.state.activePage.includes('Single|')){
				//contentElem= <Spinner/>
				const postP = this.state.activePage.split('|');
                const a = this.state.annunci.filter((e) => {
                    return e.id == postP[1];
                });
                contentElem=<Single userId={localStorage.getItem('user_id')} annuncio={a[0]} id={postP[1]} goToPage={this.goToPage.bind(this)} />
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
