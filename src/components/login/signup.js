'use strict';
import React from 'react';
import {Backend} from './../../backend';
export default class Signup extends React.Component{
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

	render(){
        
        return(
            <section>
                <div className="mui-container content">
                    <div className="mui-row">
                    <div className="mui-col-xs-12">
                        <form action="#" className="mui-form" encType="multipart/form-data">
                                <legend>Sign up</legend>

                                <div className="mui-textfield">
                                    <input type="file" name="imgProfilo"/>  
                                    <label>Immagini</label>
                                </div>
                                
                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="utente" type="text" required={true} />
                                    <label>Nome utente</label>
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <textarea></textarea>
                                    <label>Presentazione</label>
                                </div>

                                <div className="mui-select">
                                    <select name="ruolo">
                                        <option value="prof">Professore</option>
                                        <option value="staff">Staff</option>
                                        <option value="studente">Studente</option>  
                                    </select>
                                    <label>Ruolo</label>
                                </div>

                                <div className="mui-select">
                                    <select name="corso">
                                        <option value="animation" >3D Animation</option>
                                        <option value="acting">Acting</option>         
                                        <option value="film">Filmaking</option>
                                        <option value="foto">Fotografia</option>
                                        <option value="fumetto">Fumetto</option>
                                        <option value="grafica">Grafica</option>
                                        <option value="story">Storytelling</option>
                                        <option value="web">Web&App</option>
                                    </select>
                                    <label>Corso seguito</label>
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input type="email" required={true} />
                                    <label>Email</label> 
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="password" type="password" required={true} />
                                    <label>Password</label> 
                                </div>
            
                                <div className="mui-form-group">
                                    <button type="submit" className="mui-btn mui-btn--danger">Registrati</button>
                                </div>
                        </form>
                    </div>
                    </div>
                </div>
			</section>
        )
    }    
}