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
          //we need to add something like acf.user_image: this.state.media_id (not working, and won't work in setState)
          const updatedProfile={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            description: this.state.description
          }
          this.setState({
            updatedProfile:updatedProfile
          });



          localStorage.setItem('user_firstName',this.state.first_name);
          localStorage.setItem('user_lastName',this.state.last_name);
          localStorage.setItem('user_email',this.state.email);
          localStorage.setItem('user_description',this.state.description);

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
                <section>
                <div className="mui-container">
                  <div className="mui-row">
                  <div className="mui-col-xs-12">
                    <form className="mui-form">
                        <Imgblock mediaId={this.state.image_id}/>
                      <div className={this.state.ClassFirstName}>
                        <input type="text" placeholder="Nome" name="first_name" value={this.state.first_name} onChange={this.modificaInfo.bind(this)} />
                      </div>
                      <div className={this.state.ClassLastName}>
                        <input type="text" placeholder="Cognome" name="last_name" value={this.state.last_name} onChange={this.modificaInfo.bind(this)} />
                      </div>
                      <div className={this.state.ClassEmail}>
                          <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.modificaInfo.bind(this)} />
                      </div>
                      <div className={this.state.ClassDescription}>
                       <input placeholder="Descriviti in poche parole" name="description" value={this.state.description} onChange={this.modificaInfo.bind(this)} />
                     </div>
                      <button type="button"  onClick={this.submitForm.bind(this)} className="mui-btn mui-btn--primary">Modifica</button>
                      <button type="button" onClick={this.props.undo} className="mui-btn mui-btn--fab mui-btn--primary">back</button>
                      </form>

                    </div>
                  </div>
                </div>
    			</section>
            )
        }
}
