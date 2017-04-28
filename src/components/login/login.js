'use strict';
import React from 'react';

export default class Login extends React.Component{
    constructor(){
        super();
        console.log('Login started');    
    }
	render(){
        return(
            <section>
               
               <div className="mui-container">
                   <div className="mui-row">
                   
                   <form className="mui-form">
                   
                   <legend>Entra in What A Task</legend>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input type="email" />
                   <label>Email Address</label>
                   </div>
                   
                   <div className="mui-textfield mui-textfield--float-label">
                   <input type="password" />
                   <label>Password</label>
                   </div>
                   
                   <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                   
                   </form>
                    
                </div>
            </div>
            
			</section>
        )
    }
}