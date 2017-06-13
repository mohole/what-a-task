'use strict';

import React from 'react';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';
import Userbar from './userbar';

export default class List extends React.Component{

    constructor(props){
        super(props);
        this.state={
            annunci:[],
            imageUrl:[]
        }
	}
    
	showAnnuncio(evt){
		evt.preventDefault();
		const elemId = evt.currentTarget.getAttribute('data-item-id');
		console.log(elemId);
		this.props.goToPage('Single|'+elemId);
	}

    componentWillMount(){

        Backend.getAnnunci()
        .then((data)=>{
            this.setState({
                annunci:data
            })
        })
    }

    render(){
        if(this.state.annunci){
    		const items = this.state.annunci.map((e,i) => {
    		return(
                
                <section key={i}>
                    <article className="container-annuncio">
                        <div className="mui-container">
                            <div className="mui-row">
                
                                <Userbar userId={e.author} goToPage={this.props.goToPage.bind(this)} />
        			            <a href="#" onClick={this.showAnnuncio.bind(this)} data-item-id={e.id}>
                
                                <div className="mui-col-xs-12 img-annuncio">
                                    <Imgblock mediaId={e.featured_media} />
                                </div>
                              
                                <div className="mui-col-xs-12">
                                    <span className="titolo-annuncio">{e.title.rendered}</span>
                                    <p className="descrizione-annuncio">{e.content.rendered}</p>
        				        </div>
                              
        			            </a>
                            </div>      
                        </div>          
                    </article>
                                    
                    <div className="mui-container">
                        <div className="hr"></div>
                    </div>     
                        
                </section>
    		)
    		});
    		return(
    		<div>
    			{items}
    		</div>
    		)
        } else{
            return(
                <div>
                    <p>TEST</p>
                </div>
            )
        }
    }
}