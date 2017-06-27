'use strict';
import React from 'react';
import {Backend} from './../../backend';

export default class Settings extends React.Component{
    constructor(props){
      super(props);

    }



    render(){
      return(
        <div>
        <section>
            <div className="mui-container">
              <div className="mui-row">
                <div className="mui-col-xs-12">
              <div className="info-profilo">
                <span>FAQ</span>
              </div>

              <div className="hr"></div>

              <a className="link-scuola" href="http://scuola.mohole.it/">
              <div className="info-profilo">
                <span>Realizzato dagli allievi della scuola Mohole</span>
              </div>
              </a>

              <div className="hr"></div>

            <div className="info-profilo">
              <span>Termini e informazioni sulla privacy</span>
            </div>

            <div className="hr"></div>
              
            <a href="#" className="link-logout" onClick={this.props.logout}>
            <div className="info-profilo">
            <span>Logout</span><i className="ion-power"></i>
            </div>
            </a>
            </div>
              </div>
            </div>
        </section>
        </div>
      )
    }
}
