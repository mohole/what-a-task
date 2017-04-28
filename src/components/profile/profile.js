'use strict';
import React from 'react';

export default class Profile extends React.Component{
    constructor(props){
        super(props);

    }


	render(){
        return(
            <section>
            <div className="mui-container">
              <div className="mui-row">
                <div className="mui-col-xs-12">
                <img src={this.props.avatar_urls} />
                </div>
                <div className="mui-col-xs-12">
                <h1>{this.props.first_name} {this.props.last_name}</h1>
                </div>
                <div className="mui-col-xs-12">
                  <p>Mail: {this.props.email}</p>
                  <p>Descrizione: {this.props.description}</p>
                </div>
                <div className="mui-col-xs-12">
                  <a className="mui-btn mui-btn--fab mui-btn--primary">+</a>
                </div>
              </div>
            </div>
			</section>
        )
    }
}
