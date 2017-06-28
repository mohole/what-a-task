'use strict';
import React from 'react';
import {Backend} from './../../backend';
export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
			utente: '',
			password: '',
			ClassNameControl:'mui-textfield'
        };
    }

     writing(evt){
         const input = evt.target;
         const elemento = input.getAttribute('name');
         this.setState({
            [elemento]: input.value
        });
      }
    showError(control){
        if (control=='mui-textfield error') {
            return <p>Username o password errati.</p>;
        }
    }
    checkLogin(){
        if(this.state.utente != '' && this.state.password != ''){
			Backend.setCredentials(this.state.utente,this.state.password);
			Backend.checkAuth().then((data)=>{
				this.setState({
					ClassNameControl:'mui-textfield success'
				})
				localStorage.setItem('token', btoa(this.state.utente + ':' + this.state.password));
				console.log("Login ok");
				console.log(data);

				if(data.code!='rest_forbidden' && data.code!='rest_not_logged_in' && data.code!='rest_user_invalid_id'){
					this.setState({
						ClassNameControl:'mui-textfield success'
					})
					this.props.makeLogin();
				}else{
					this.setState({
						ClassNameControl:'mui-textfield error'
					})
				}
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

        <div className="background">
        <div className="vertical-center">
          <div className="mui-container">
            <div className="mui-row">
              <div className="mui-col-xs-12">
                <form className="mui-form">
                  <legend className="logo">WHAT A TASK</legend>
                  {this.showError(this.state.ClassNameControl)}
                  <div className="mui-textfield mui-textfield--float-label">
                    <input name="utente" className="my-input" type="text" onChange={this.writing.bind(this)} value={this.state.utente} />
                    <label className="my-label">Utente</label>
                  </div>
                  <div className={this.state.ClassNameControl}>
                    <input name="password" className="my-input" type="password" onChange={this.writing.bind(this)} />
                    <label className="my-label">Password</label>
                  </div>
                  <button type="button" className="my-button mui-col-xs-12 mui-btn mui-btn--raised" onClick={this.checkLogin.bind(this)}>LOGIN</button>
                  <button type="button" className="my-button mui-col-xs-12 mui-btn mui-btn--raised">REGISTRATI</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>

    </section>
    )
    }
}
