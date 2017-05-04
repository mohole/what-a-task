'use strict';
import React from 'react';
import {Backend} from './../backend';
import Single from './single-item/single-item';
import EditItem from './single-item/edit-item';

export default class App extends React.Component{
  constructor(){
      super();
      console.log('app started');

      this.state ={
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
	render(){
        return(
          <section>
            <h2>MODIFICA ANNUNCIO</h2>
            <hr/>
            <EditItem
              id="1"
              text={this.state.text}
              title={this.state.title}
              image={this.state.image}
              cat={this.state.cat}
              privacyCheck={this.state.privacyCheck}
              selectedCat={this.state.selectedCat}
              type={this.state.type}
        			ClassNameTitle={this.state.ClassNameTitle}
        			ClassNameText={this.state.ClassNameText}
        			ClassNamePrivacy={this.state.ClassNamePrivacy}
        			ClassNameCategory={this.state.ClassNameCategory}
             />

             <hr/>
             <h2>SINGOLO ANNUNCIO</h2>
             <hr/>
  		        <Single
                id="1"
                authorId="1"
                userId="1"
                title="titolo"
                category="categoria"
                img="http://lorempixel.com/640/360"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae odit, ad nobis inventore neque. Atque cum voluptate tempora debitis!"
                name="Nome Cognome"
                date="18/04/2017"
              />
    			</section>
        )
    }
}

/*






*/
