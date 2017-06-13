'use strict';
import React from 'react';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';

export default class ModifyProfile extends React.Component{
  constructor(props){
      super(props);

      this.state={
        modify:{},
        ClassFirstName: 'my-textfield mui-textfield mui-textfield--float-label',
        ClassLastName: 'mui-textfield',
        ClassEmail: ' my-textfield mui-textfield mui-textfield--float-label',
        ClassDescription: ' mui-textfield mui-textfield--float-label',
        image_id: this.props.image_id,
        media_id: this.props.image_id,
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        description: this.props.description,
        listaScuole: this.props.listaScuole,
        scuola: this.props.scuola
      }

    }

    modificaInfo(evt){
      const input = evt.target.value;
	  const elem=evt.target.getAttribute('name');
      this.setState({
          [elem] : input
      });
  }

  setScuola(evt){
      this.setState({
          scuola:parseInt(evt.target.value)
      })
  }


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

    submitForm(){
        var error=0;
        if(this.state.first_name=='' || this.state.first_name.length<3){
          this.setState({
            ClassFirstName: 'error my-textfield mui-textfield mui-textfield--float-label'
          })
          error ++;
          }else{
        this.setState({
          ClassFirstName: 'success my-textfield mui-textfield mui-textfield--float-label'
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
          ClassEmail: 'error my-textfield mui-textfield mui-textfield--float-label'
        })
        error ++;
      }else{
        this.setState({
        ClassEmail: 'success my-textfield mui-textfield mui-textfield--float-label'
        });
      }
      if(this.state.description=='' || this.state.description.length<3){
        this.setState({
          ClassDescription: 'error mui-textfield mui-textfield--float-label'
        })
        error ++;
      }else{
        this.setState({
          ClassDescription: 'success mui-textfield mui-textfield--float-label'
        })
      }
      if(error==0){
          var acf={
                user_image:this.state.media_id,
                user_role: this.state.role,
                user_email: this.state.email,
                user_firstname: this.state.first_name,
                user_lastname: this.state.last_name,
                user_scuola: this.state.scuola.toString()
          }

          const updatedProfile={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            description: this.state.description,
            acf:acf
          }
          console.log('UPDATED PROFILE: '+updatedProfile);

          this.setState({
            updatedProfile:updatedProfile
          });

          localStorage.setItem('user_firstName',this.state.first_name);
          localStorage.setItem('user_lastName',this.state.last_name);
          localStorage.setItem('user_email',this.state.email);
          localStorage.setItem('user_description',this.state.description);
          localStorage.setItem('user_image',this.state.media_id);
          localStorage.setItem('user_scuola',this.state.scuola);

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
      const scuole =this.state.listaScuole.map((e,i) =>{
          return(
              <option value={e.id} key={e.id} onChange={this.setScuola.bind(this)}>{e.name}</option>
          )
      });

            return(
        <div>
          <section>
            <div className="poster-utente">
              <Imgblock mediaId={this.state.image_id}/>
              <div className="mui-container">
                <div className="mui-row">
                    <input type="file" name="image_id" onChange={this.uploadFile.bind(this)} />
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
                          <div className={this.state.ClassFirstName}>
                            <input type="text" placeholder="Nome" name="first_name" value={this.state.first_name} onChange={this.modificaInfo.bind(this)} />
                            <label>Nome</label>
                          </div>
                        </div>
                        <div className="info-profilo">
                          <div className={this.state.ClassFirstName}>
                            <input type="text" placeholder="Cognome" name="last_name" value={this.state.last_name} onChange={this.modificaInfo.bind(this)} />
                            <label>Cognome</label>
                          </div>
                        </div>
                        <div className="info-profilo">
                          <div className={this.state.ClassEmail}>
                          <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.modificaInfo.bind(this)} />
                          <label>Email</label>
                        </div>
                      </div>
                        <div className="info-profilo">
                        <div className="mui-select">
                          <select name="" id="ann_category" value={this.state.scuola} onChange={this.setScuola.bind(this)}>
                              {scuole}
                          </select>
                          <label>Corso</label>
                        </div>
                      </div>
                        <div className="info-profilo">
                          <div className={this.state.ClassDescription}>
                            <textarea required placeholder="Descriviti in poche parole" name="description" value={this.state.description} onChange={this.modificaInfo.bind(this)}></textarea>
                          </div>
                        </div>
                        <button type="button" onClick={this.submitForm.bind(this)} className="my-button mui-col-xs-12 mui-btn mui-btn--danger">MODIFICA</button>
                        <button type="button" onClick={this.props.undo} className="mui-btn mui-btn--fab mui-btn--primary">back</button>

                      </form>
        						</div>
        					</div>
        				</div>
        		</section>
          </div>
            )
        }
}
