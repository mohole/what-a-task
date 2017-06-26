'use strict';
import React from 'react';
import ModifyProfile from './modify_profile';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';
import Spinner from './../common/spinner';

export default class AnnunciUtente extends React.Component {
    constructor(props) {
        super(props);
    }
    /*
    <Userbar userId={e.author} category={e.tags[0]} goToPage={this.props.goToPage.bind(this)} />


    */
    render(){
        if(this.props.annunci){
            const items = this.props.annunci.map((e,i) => {
          let hr= "";
            if(this.props.annunci.length>1 && i!=this.props.annunci.length-1){
              hr= <div className="hr"></div>
            }
            return(
                <section key={i}>
                    <article className="container-annuncio">
                        <div className="mui-container">
                            <div className="mui-row">

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
                  <p>Nessun annuncio pubblicato.</p>
                </div>
            )
        }
    }
}
