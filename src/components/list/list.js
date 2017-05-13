'use strict';

import React from 'react';

export default class List extends React.Component{

    constructor(props){
        super(props);
	}
	showAnnuncio(evt){
		evt.preventDefault();
		const elemId = evt.currentTarget.getAttribute('data-item-id');
		console.log(elemId);
		this.props.goToPage('Single|'+elemId)
	} 
    render(){
        if(this.props.annunci.length>0){
    		const items = this.props.annunci.map((e,i) => {
    		return(
        			<a href="#" onClick={this.showAnnuncio.bind(this)} data-item-id={e.id} key={i}>
        				<div className="mui-container">
        				  <div className="mui-row">
        					<div className="mui-col-xs-12">
        					  <div><img src={e.acf.url_img} /></div>
        					  <h4><strong>{e.title.rendered}</strong></h4>
        					  <p>{e.content.rendered}</p>
        					</div>
        				  </div>
        				</div>
        			</a>
    		)
    		});
    		return(
    		<div>
    			{items}
    		</div>
    		)
        } else {
            return(
                <div>
                    <p>no items found.</p>
                </div>
            )
        }
    }
}
