'use strict';
import React from 'react';

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state={
          nome: 'Tiziano Borgato',
          imgUtente: 'http://lorempixel.com/200/200',
          corso: 'Web & App',
          mail: 'tiziano.borgato@gmail.com',
          telefono: '334 1301904'
        }
    }


	render(){
        return(
            <section>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center"><img src={this.state.imgUtente} />
                </div>
                <div className="col-xs-12 text-center"><h1>{this.state.nome}</h1>
                </div>
                <div className="col-xs-12">
                  <p>Corso: {this.state.corso}</p>
                  <p>Mail: {this.state.mail}</p>
                  <p>Tel: {this.state.telefono}</p>
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
