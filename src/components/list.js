'use strict';

import React from 'react';
import {Annunci} from './data.js';

export default class List extends React.Component{
    
    constructor(){
        super();
        this.state = {
            annunci: Annunci
        }
    }

    render(){
        const items = this.state.annunci.map((e,i) => {  
        return(
        <div key={i}>
        <div><img src={e.image} /></div>
        <h4><strong>{e.title}</strong></h4>
        <p>{e.text}</p>
        </div>  
        ) 
        });
        return(
        <div>
            {items}
        </div>
        ) 
    }
}