'use strict';
import React from 'react';

export default class Single extends React.Component{
  constructor(props){
      super(props);
  }
	render(){
        return(
          <section>
            <div className="row">
              <div className="col-xs-12">
                <h2>{this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}</h2>
                <small>Categoria: <a href="#">{this.props.category}</a></small>
                <a href="#" className="float-xs-right"><span className="glyphicon glyphicon-pencil"></span></a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <img src={this.props.img} className="img img-fluid"/>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xs-12">
                <p>{this.props.description}</p>
                <button className="btn btn-success btn-block">Contatta</button>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xs-12">
                <p>Creato da <a href="#">{this.props.name}</a> il {this.props.date}</p>
              </div>
            </div>
    			</section>
        )
    }
}
