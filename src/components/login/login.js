'use strict';
import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
                email: '',
                password: '',
            userCredentials: {}
        };
    }
    
     writing(evt){
         const input = evt.target;
         const elemento = input.getAttribute('name');
         this.setState({
            [elemento]: input.value 
        }); 
      }
    
    checkLogin(){
        if(this.state.email != '' && this.state.password != ''){
            console.log("ok");
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            this.setState({
                userCredentials : user
            })
            
        }
        
        if(this.state.email == '' || this.state.password == '' ){
            console.log("manca un campo");
        }
    }
    
	render(){
        
        return(
            <section>
               
               <div className="mui-container">
                   <div className="mui-row">
                   
                   <form className="mui-form">
                   
                   <legend>Entra in What A Task</legend>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input name="email" type="text" onChange={this.writing.bind(this)} value={this.state.email} />
                   <label>Email Address</label>
                   </div>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input name="password" type="password" onChange={this.writing.bind(this)} />
                   <label>Password</label>
                   </div>
                   
                   <button type="button" className="mui-btn mui-btn--raised" onClick={this.checkLogin.bind(this)}>Entra</button>
                   
                   </form>
                    
                </div>
            </div>
            
			</section>
        )
    }    
}