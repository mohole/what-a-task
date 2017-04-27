'use strict';
import React from 'react';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
      
    }


	render(){
        return(
            <section>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center"><img src={this.props.avatar_urls} />
                </div>
                <div className="col-xs-12 text-center"><h1>{this.props.first_name} {this.props.last_name}</h1>
                </div>
                <div className="col-xs-12">
                  <p>Mail: {this.props.email}</p>
                  <p>Descrizione: {this.props.description}</p>
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
