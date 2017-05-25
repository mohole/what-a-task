'use strict';
import React from 'react';
import ModifyProfile from './modify_profile';
import {Backend} from './../../backend';

export default class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state={
        	isEditable: true,
        	editActive: false,
			media_id:this.props.image_id
        }
		Backend.getMedia(this.props.image_id)
		.then((data)=>{
			console.log(data);
			this.setState({
				media_url:data.media_details.sizes.medium_large.source_url
			})
		})
    }

    editProfile(){
      this.setState({
        editActive: !this.state.editActive
      })
    }
	render(){

      let btnEdit='';
    if(this.state.isEditable){
       btnEdit = <button onClick={this.editProfile.bind(this)} className="mui-btn mui-btn--fab mui-btn--primary">+</button> ;
    }


    if(this.state.editActive && this.state.isEditable){
        return(
      <ModifyProfile
          first_name= {this.props.first_name}
          last_name= {this.props.last_name}
          avatar_urls= {this.props.image_id}
          email= {this.props.email}
          description= {this.props.description}
          undo={this.editProfile.bind(this)}
          />
            )
        }else{
        return(
            <section>
            <div className="mui-container">
              <div className="mui-row">
                <div className="mui-col-xs-12">
                <img src={this.state.media_url} />
                </div>
                <div className="mui-col-xs-12">
                <h1>{this.props.first_name} {this.props.last_name}</h1>
                </div>
                <div className="mui-col-xs-12">
                  <p>Mail: {this.props.email}</p>
                  <p>Descrizione: {this.props.description}</p>
                </div>
                <div className="mui-col-xs-12">
                  {btnEdit}
                </div>
              </div>
            </div>
			      </section>
            )
          }
    }
}
