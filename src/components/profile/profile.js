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
			media_id:this.props.image_id,
            first_name:'',
            last_name:'',
            avatar_urls:'',
            email:'',
            description:''
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

    componentWillMount(){
        Backend.getUserInfo(this.props.profileId).then((data)=>{
            this.setState({
                first_name:data.first_name,
                last_name:data.last_name,
                avatar_urls:data.avatar_urls,
                email:data.email,
                description:''
            })
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
          first_name= {this.state.first_name}
          last_name= {this.state.last_name}
          avatar_urls= {this.props.image_id}
          email= {this.state.email}
          description= {this.state.description}
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
                        <h1>{this.state.first_name} {this.state.last_name}</h1>
                        </div>
                        <div className="mui-col-xs-12">
                          <p>Mail: {this.state.email}</p>
                          <p>Descrizione: {this.state.description}</p>
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
