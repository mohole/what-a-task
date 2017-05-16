'use strict';
import React from 'react';
import Spinner from './../common/spinner';
import {Backend} from './../../backend';
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
                newUser:{},
                utente:'',
                email:'',
                password:'',
                prs:'',
                image:{},
                privacyCheck:false
        };
    }
    
     writing(evt){
         const input = evt.target;
         const elemento = input.getAttribute('name');
         this.setState({
            [elemento]: input.value  
        }); 
      }
	uploadFile(evt){
		console.log(evt.target.files);
		const file=evt.target.files[0];
		console.log(file.size);
		var formData = new FormData();
      	formData.append('image', file, file.name);
		this.setState({
            image : formData
        });
		console.log(formData);
	}
    checkPrivacy(evt){
		console.log(!this.state.privacyCheck);
        this.setState({
            privacyCheck : !this.state.privacyCheck
        });
    }    
    resetForm(){
		console.log('reset');
		console.log(this.state);
		this.setState({
                newUser:{},
                utente:'',
                email:'',
                password:'',
                prs:'',
                image:{},
                privacyCheck:false
		});
	}
	render(){
        
        return(
            <section>
                <div className="mui-container content">
                    <div className="mui-row">
                    <div className="mui-col-xs-12">
                        <form action="#" className="mui-form" encType="multipart/form-data">
                                <h3>Sign up</h3>
            
                                <div className="mui-textfield">   
                                    <input type="file" placeholder="Immagine profilo" 
                                    onChange={this.uploadFile.bind(this)} />
                                </div> 
        
                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="utente" type="text" onChange={this.writing.bind(this)} value={this.state.utente}/>
                                    <label>Nome utente</label>
                                </div>                                           

                                <div className="mui-textfield mui-textfield--float-label">
                                    <textarea name="prs" type="text" onChange={this.writing.bind(this)}
                                    value={this.state.prs}></textarea>
                                    <label>Presentazione</label>
                                </div>

                                <div className="mui-select">
                                    <select>
                                        <option value="prof">Professore</option>
                                        <option value="staff">Staff</option>
                                        <option value="studente">Studente</option>  
                                    </select>
                                    <label>Ruolo</label>
                                </div>
                                        
                                <div className="mui-select">
                                    <select defaultValue="web">
                                        <option value="animation">3D Animation</option>
                                         <option value="acting">Acting</option>
                                        <option value="film">Filmaking</option>   
                                        <option value="foto">Fotografia</option>
                                        <option value="fumetto">Fumetto</option>  
                                        <option value="grafica">Grafica</option> 
                                        <option value="story">Storytelling</option>                   
                                        <option value="web">Web&App</option>
                                    </select>
                                    <label>Ruolo</label>
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input type="email" value={this.state.email} onChange={this.writing.bind(this)} />
                                    <label>Email</label> 
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="password" type="password" onChange={this.writing.bind(this)} />
                                    <label>Password</label>
                                </div>
    
                                <div className='mui-checkbox'>
                                    <label>Termini e condizioni</label><br/>
                                    <input type="checkbox" checked={this.state.privacyCheck} onChange={this.checkPrivacy.bind(this)}/><span> Accetto i <a href="#">termini della privacy</a></span>
                                </div>
                                
                                <div className="mui-form-group">
                                    <button type="submit" className="mui-btn ">Registrati</button>
                                    <button type="button" onClick={this.resetForm.bind(this)} 
                                    className="mui-btn mui-btn--danger">Annulla</button>
                                </div>
                        </form>
                    </div>
                    </div>
                </div>
			</section>
        )
    }    
}