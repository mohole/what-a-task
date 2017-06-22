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

    componentWillMount(){
        Backend.getAnnunci()
        .then((data)=>{
            this.setState({
                annunci:data
            });
        })
    }

    render(){
        if(this.state.annunci){
    		const items = this.state.annunci.map((e,i) => {
          let hr= "";
            if(this.state.annunci.length>1 && i!=this.state.annunci.length-1){
              hr= <div className="hr"></div>
            }
    		return(

                <section key={i}>
                    <article className="container-annuncio">
                        <div className="mui-container">
                            <div className="mui-row">

                                <Userbar userId={e.author} category={e.tags[0]} goToPage={this.props.goToPage.bind(this)} />
        			            <a href="#" onClick={()=>{this.props.goToPage('Single|'+e.id)}} data-item-id={e.id}>

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
                        {hr}
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
                  <Spinner/>
                </div>
            )
        }
    }
}
