'use strict';
import React from 'react';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';

export default class ModifyProfile extends React.Component{
  constructor(props){
      super(props);

      this.state={
        modify:{},
        ClassFirstName: 'mui-textfield',
        ClassLastName: 'mui-textfield',
        ClassEmail: 'mui-textfield',
        ClassDescription: 'mui-textfield',
        image_id: this.props.image_id,
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        description: this.props.description
      }

    }

    modificaInfo(evt){
              const input = evt.target.value;
      		    const elem=evt.target.getAttribute('name');
              this.setState({
                  [elem] : input
              });
          }

/*
upload works, but the fetch needs to be fixed


  	uploadFile(evt){
  		const file=evt.target.files[0];
  		console.log(file);
  		Backend.upLoadMedia(file)
          .then((data)=>{
  		    console.log('id:'+data.id);
      		this.setState({
      			media_id:data.id
  		    })
  		})
  	}

this should be added to render() once the image fetch works:

<div className="mui-textfield">
    <input type="file" name="image_id"  onChange={this.uploadFile.bind(this)} />
</div>

*/


    submitForm(){
        var error=0;
        if(this.state.first_name=='' || this.state.first_name.length<3){
          this.setState({
            ClassFirstName: 'mui-textfield error'
          })
          error ++;
          }else{
        this.setState({
          ClassFirstName: 'mui-textfield success'
        });
      }
      if(this.state.last_name=='' || this.state.last_name.length<3){
        this.setState({
          ClassLastName: 'mui-textfield error'
        })
        error ++;
      }else{
        this.setState({
          ClassLastName: 'mui-textfield success'
        });
      }
      if(this.state.email=='' || this.state.email.length<3){
        this.setState({
          ClassEmail: 'mui-textfield error'
        })
        error ++;
      }else{
        this.setState({
        ClassEmail: 'mui-textfield success'
        });
      }
      if(this.state.description=='' || this.state.description.length<3){
        this.setState({
          ClassDescription: 'mui-textfield error'
        })
        error ++;
      }else{
        this.setState({
          ClassDescription: 'mui-textfield success'
        })
      }
      if(error==0){
        var name= this.state.first_name+' '+this.state.last_name;
          const updatedProfile={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            description: this.state.description,
            name: name
          }
          this.setState({
            updatedProfile:updatedProfile
          });

          Backend.updateProfile(this.props.profileId,updatedProfile)
              .then((data)=>{
              console.log(data);
                  if(data.status=='publish'){
                      console.log('Profilo modificato');
                  }
              }).then(()=>{
                  this.props.undo();
              });
      }

    }
      render(){
            return(
        <div>
          <section>
            <div className="poster-utente">
            <img src="{this.state.image_id}" alt=""/>
              <div className="mui-container">
                <div className="mui-row">
                <input type="file" name="avatar_urls" value="" onChange={this.modificaInfo.bind(this)} />
                </div>
              </div>
            </div>
            </section>


            <section>
        				<div className="mui-container">
        					<div className="mui-row">
        						<div className="mui-col-xs-12">
                      <form className="mui-form">
                        <div className="info-profilo">
                          <div className="{this.state.ClassFirstName} my-textfield mui-textfield mui-textfield--float-label">
                            <input type="text" placeholder="Nome" name="first_name" value={this.state.first_name} onChange={this.modificaInfo.bind(this)} />
                            <label>Nome</label>
                          </div>
                        </div>
                        <div className="info-profilo">
                          <div className="{this.state.ClassFirstName} my-textfield mui-textfield mui-textfield--float-label">
                            <input type="text" placeholder="Cognome" name="last_name" value={this.state.last_name} onChange={this.modificaInfo.bind(this)} />
                            <label>Cognome</label>
                          </div>
                        </div>
                        <div className="info-profilo">
                          <div className="{this.state.ClassEmail} my-textfield mui-textfield mui-textfield--float-label">
                          <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.modificaInfo.bind(this)} />
                          <label>Email</label>
                        </div>
                      </div>
                          <div className="info-profilo">
                          <div className="mui-select">
                            <select>
                              <option></option>
                              <option></option>
                            </select>
                            <label>Titolo</label>
                          </div>
                        </div>
                        <div className="info-profilo">
                        <div className="mui-select">
                          <select>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                          </select>
                          <label>Corso</label>
                        </div>
                      </div>
                        <div className="info-profilo">
                          <div className="{this.state.ClassDescription} mui-textfield mui-textfield--float-label">
                            <textarea required placeholder="Descriviti in poche parole" name="description" value={this.state.description} onChange={this.modificaInfo.bind(this)}></textarea>
                          </div>
                        </div>
                        <button type="button" onClick={this.submitForm.bind(this)} className="my-button mui-col-xs-12 mui-btn mui-btn--danger">MODIFICA</button>
                      </form>
        						</div>
        					</div>
        				</div>
        		</section>
          </div>
            )
        }
}
