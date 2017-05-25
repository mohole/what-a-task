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

		Backend.getMe()
		.then((data)=>{
			console.log(data);
			this.setState({
				user_id:data.id,
				user_email:data.email,
				user_firstName:data.first_name,
				user_lastName:data.last_name,
				user_description:data.description,
				user_role:parseInt(data.acf.user_role),
				user_image:parseInt(data.acf.user_image)
			})
		})
		Backend.getAnnunci()
		.then((data)=>{
			this.setState({
				annunci:data
			})
		})

		this.setState({
			logged:!this.state.logged,
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
  contentElem = <Profile profileId={user[1]} first_name= 'Tiziano' last_name= 'Borgato' avatar_urls= 'http://lorempixel.com/200/200' email= 'tiziano.borgato@gmail.com' description= 'Sono uno studente del secondo anno di Web & Apps. Per maggiori info contattatemi al 334 1301904' />
      }
			if(this.state.activePage=='Profile'){
				contentElem= <Spinner/>
				contentElem = <Profile first_name={this.state.user_firstName} last_name={this.state.user_lastName} image_id={this.state.user_image} email={this.state.user_email} description={this.state.user_description} />
			}

			if(this.state.activePage.includes('Single|')){
				//contentElem= <Spinner/>
				const postP = this.state.activePage.split('|');
                const a = this.state.annunci.filter((e) => {
                    return e.id == postP[1];
                });
                contentElem=<Single annuncio={a[0]} id={postP[1]} goToPage={this.goToPage.bind(this)} />


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
