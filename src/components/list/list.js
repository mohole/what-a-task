'use strict';

import React from 'react';
import {Backend} from './../../backend';
import ListImg from './listimg';
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
                <section>
                    <Userbar userId={e.author} />
        			<a href="#" onClick={this.showAnnuncio.bind(this)} data-item-id={e.id} key={i}>
        				<div className="mui-container">
        				  <div className="mui-row">
                            <ListImg mediaId={e.featured_media} />
        					<div className="mui-col-xs-12">
        					  <h4><strong>{e.title.rendered}</strong></h4>
        					  <p>{e.content.rendered}</p>
        					</div>
        				  </div>
        				</div>
        			</a>
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
