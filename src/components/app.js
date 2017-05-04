'use strict';
import React from 'react';
import List from './list/list';
import {Annunci} from './data.js';

export default class App extends React.Component{
  constructor(){
      super();
      console.log('app started');

      this.state ={
        //annunci da modificare
          annunci: Annunci
      }
  }
	render(){
        return(
          <section>
            <List
            annunci={this.state.annunci} />
    			</section>
        )
    }
}

/*






*/
