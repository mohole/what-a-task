'use strict';
import React from 'react';

export default class ModifyProfile extends React.Component{
  constructor(props){
      super(props);

      this.state={
        modify:{},
        ClassFirstName: 'mui-textfield',
        ClassLastName: 'mui-textfield',
        ClassEmail: 'mui-textfield',
        ClassDescription: 'mui-textfield',
        avatar_urls: this.props.avatar_urls,
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
          const modify={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            description: this.state.description
          }
          this.setState({
            modify:modify
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
                      <div className="mui-textfield">
                        <input type="file" name="avatar_urls" value="" onChange={this.modificaInfo.bind(this)} />
                      </div>
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
