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
			media_id:'',
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
        if(this.props.profileId!==this.props.currentId){
            Backend.getUserInfo(this.props.profileId).then((data)=>{
                this.setState({
                    first_name:data.first_name,
                    last_name:data.last_name,
                    avatar_id:data.acf.user_image,
                    email:data.email,
                    description:data.description
                })
            })
        } else {
            this.setState({
                media_id:this.props.image_id,
                first_name:this.props.first_name,
                last_name:this.props.last_name,
                avatar_urls:this.props.avatar_urls,
                email:this.props.email,
                description:this.props.description
            })
        }
    }

    componentWillReceiveProps(){
        this.setState({
            media_id:this.props.image_id,
            first_name:this.props.first_name,
            last_name:this.props.last_name,
            avatar_urls:this.props.avatar_urls,
            email:this.props.email,
            description:this.props.description
        })
    }


	render(){

      let btnEdit='';
    if(this.state.isEditable && this.props.profileId===this.props.currentId){
       btnEdit = <button onClick={this.editProfile.bind(this)} className="mui-btn mui-btn--fab mui-btn--primary">+</button> ;
    }


    if(this.state.editActive && this.state.isEditable){
        return(
      <ModifyProfile
          profileId={this.props.profileId}
          first_name= {this.state.first_name}
          last_name= {this.state.last_name}
          avatar_urls= {this.props.avatar_urls}
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
                        <img src={this.props.avatar_urls} />
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
