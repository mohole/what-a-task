'use strict';
import React from 'react';
import {Backend} from './../backend';

export default class Single extends React.Component{
  constructor(props){
      super(props);
  }

	render(){
        return(
          <section>
            <div className="mui-container content">
              <div className="mui-row">
                <div className="mui-col-xs-12">
                  <h2>{this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}</h2>
                  <small>Categoria: <a href="#">{this.props.category}</a></small>
                  {Backend.isAuthor(this.props.userId)}
                </div>
              </div>
              <div className="mui-row">
                <div className="mui-col-xs-12">
                  <img src={this.props.img} className="img img-fluid"/>
                </div>
              </div>
              <hr />
              <div className="mui-row">
                <div className="mui-col-xs-12">
                  <p>{this.props.description}</p>
                  <button className="mui-btn mui-btn--primary">Contatta</button>
                </div>
              </div>
              <hr />
              <div className="mui-row">
                <div className="mui-col-xs-12">
                  <p>Creato da <a href="#">{this.props.name}</a> il {this.props.date}</p>
                </div>
              </div>
            </div>
    			</section>
        )
    }
}
