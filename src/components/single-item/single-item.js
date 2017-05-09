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
    if(userId===authorId){
      return <button onClick={()=>{this.editItem()}}>MODIFICA</button>;
    }
  }

	render(){
        if(this.state.editActive && this.state.isEditable){
            return(
                <EditItem
                    id="1"
                    text={this.props.text}
                    title={this.props.title}
                    image={this.props.image}
                    postCategory={this.props.postCategory}
                    privacyCheck={this.props.privacyCheck}
                    selectedCat={this.props.selectedCat}
                    type={this.props.type}
                    ClassNameTitle={this.props.ClassNameTitle}
                    ClassNameText={this.props.ClassNameText}
                    ClassNamePrivacy={this.props.ClassNamePrivacy}
                    ClassNameCategory={this.props.ClassNameCategory}
                />
            )
        } else {
            return(
              <section>
                <div className="mui-container content">
                  <div className="mui-row">
                    <div className="mui-col-xs-12">
                      <h2>{this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}</h2>
                      <small>Categoria: <a href="#">{this.props.category}</a></small>
                      {this.isAuthor(this.props.userId, this.props.authorId)}
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
}
