'use strict';
import React from 'react';

export default class Profile extends React.Component{
    constructor(){
        super();
    }
	render(){
        return(
            <section>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center"><img src="http://lorempixel.com/200/200" />
                </div>
                <div className="col-xs-12 text-center"><h1>Nome Cognome</h1>
                </div>
                <div className="col-xs-12">
                  <p>Corso: Lorem ipsum.</p>
                  <p>Mail: pippo@pippo</p>
                  <p>Tel: 0123456789</p>
                </div>
                <div className="col-xs-12">
                  <a href="btn btn-primary"><i className="glyphicon glyphicon-certificate"></i></a>
                  <a href="btn btn-primary"><i className="glyphicon glyphicon-certificate"></i></a>
                  <a href="btn btn-primary"><i className="glyphicon glyphicon-certificate"></i></a>
                </div>
              </div>
            </div>
			</section>
        )
    }
}
