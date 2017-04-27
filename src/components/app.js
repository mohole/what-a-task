'use strict';
import React from 'react';
import Profile from './profile';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');
    }
	render(){
        return(
            <section>
			<Profile
      first_name= 'Tiziano'
      last_name= 'Borgato'
      avatar_urls= 'http://lorempixel.com/200/200'
      email= 'tiziano.borgato@gmail.com'
      description= 'Sono uno studente del secondo anno di Web & Apps. Per maggiori info contattatemi al 334 1301904'

      />
			</section>
        )
    }
}
