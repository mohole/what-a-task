'use strict';
import React from 'react';
import Single from './single-item';

export default class App extends React.Component{
  constructor(){
      super();
      console.log('app started');
  }
	render(){
        return(
          <section>
		        <Single
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
