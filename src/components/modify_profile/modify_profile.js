'use strict';
import React from 'react';

export default class ModifyProfile extends React.Component{
  constructor(props){
      super(props);

      this.state={
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


      render(){
            return(
                <section>
                <div className="mui-container">
                  <div className="mui-row">
                  <div className="mui-col-xs-12">
                  <form className="mui-form">
                    <div className="mui-textfield">
                    <input type="file" name="avatar_urls" value={this.state.avatar_urls} onChange={this.modificaInfo.bind(this)} />
                      <input type="text" placeholder="Nome" name="first_name" value={this.state.first_name} onChange={this.modificaInfo.bind(this)} />
                    </div>
                    <div className="mui-textfield">
                      <input type="text" placeholder="Cognome" name="last_name" value={this.state.last_name} onChange={this.modificaInfo.bind(this)} />
                    </div>
                    <div className="mui-textfield">
                        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.modificaInfo.bind(this)} />
                    </div>
                    <div className="mui-textfield">
                     <input placeholder="Descriviti in poche parole" name="description" value={this.state.description} onChange={this.modificaInfo.bind(this)} />
                   </div>
                    <button type="submit" className="mui-btn mui-btn--primary">Submit</button>
                    </form>
                    </div>
                  </div>
                </div>
    			</section>
            )
        }
}
