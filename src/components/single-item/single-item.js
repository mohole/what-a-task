'use strict';
import React from 'react';
import {Backend} from './../../backend';
import EditItem from './edit-item';

export default class Single extends React.Component{
  constructor(props){
      super(props);

      this.state={
        isEditable: true,
        editActive: false
      }
  }

  editItem(){
    this.setState({
      editActive: !this.state.editActive
    })
  }

  isAuthor(userId, authorId){
    if(userId==authorId){
      return <button onClick={()=>{this.editItem()}}>MODIFICA</button>;
    }
  }
printDate(date){
  	var year=date.substr(0,4);
  	var month=date.substr(5,2);
  	var day=date.substr(8,2);
  	return(day+'/'+month+'/'+year);
  }

	render(){
        if(this.props.annuncio.length!=0){
            if(this.state.editActive && this.state.isEditable){
                return(
                    <EditItem
                        id={this.props.annuncio.id}
                        text={this.props.annuncio.content.rendered}
                        title={this.props.annuncio.title.rendered}
                        image={this.props.annuncio.acf.url_img}
                        selectedCat={this.props.annuncio.tags}
                        categoryList={this.props.categoryList}
                        type={this.props.annuncio.categories}
                    />
                )
            } else {
                return(
                  <section>
                      <div className="mui-container content">
                        <div className="mui-row">
                          <div className="mui-col-xs-12">
                            <h2>{this.props.annuncio.title.rendered.charAt(0).toUpperCase() + this.props.annuncio.title.rendered.slice(1)}</h2>
                            <small>Categoria: <a href="#">{this.props.currCat} </a></small>
                            {this.isAuthor(this.props.userId, this.props.annuncio.author)}
                          </div>
                        </div>
                        <div className="mui-row">
                          <div className="mui-col-xs-12">
                            <img src={this.props.annuncio.acf.url_img} className="img img-fluid"/>
                          </div>
                        </div>
                        <hr />
                        <div className="mui-row">
                          <div className="mui-col-xs-12">
                            <p>{this.props.annuncio.content.rendered}</p>
                            <button className="mui-btn mui-btn--primary">Contatta</button>
                          </div>
                        </div>
                        <hr />
                        <div className="mui-row">
                          <div className="mui-col-xs-12">
                            <p>Creato da <a href="#">{this.props.author.name}</a> il {this.printDate(this.props.annuncio.date)}</p>
                          </div>
                        </div>
                      </div>
            		</section>
                )
            }
        } else {
            console.log('no props');
            return(
                <div>NO PROPS.</div>
            )
        }
    }
}
