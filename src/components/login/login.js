'use strict';
import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
                utente: '',
                password: '',
                ClassNameControl:'mui-textfield',
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
        if(this.state.utente != '' && this.state.password != ''){
            console.log("ok!");
            const user = {
                utente: this.state.utente,
                password: this.state.password
            }
            this.setState({
                userCredentials : user,
                ClassNameControl:'mui-textfield success'
            })      
        }
        
        if(this.state.utente == '' || this.state.password == '' ){
            console.log("manca un campo");
            this.setState({
				ClassNameControl:'mui-textfield error'
			})
        }
    }
    
	render(){
        
        return(
            <section>
               
               <div className="mui-container">
                   <div className="mui-row">
                   
                   <form className="mui-form">
                   
                   <legend>Entra in What A Task</legend>
            
                   <div className={this.state.ClassNameControl}>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input name="utente" type="text" onChange={this.writing.bind(this)} value={this.state.utente} />
                   <label>Nome Utente</label>
                   </div>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input name="password" type="password" onChange={this.writing.bind(this)} />
                   <label>Password</label>
                   </div>
                   
                   </div>
                   
                   <button type="button" className="mui-btn mui-btn--raised" onClick={this.checkLogin.bind(this)}>Entra</button>
                   
                   </form>
                    
                </div>
            </div>
            
			</section>
        )
    }    
}