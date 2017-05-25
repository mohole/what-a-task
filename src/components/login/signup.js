'use strict';
import React from 'react';
import Spinner from './../common/spinner';
import {Backend} from './../../backend';
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
                newUser:{},     
                ruolo:this.props.ruoloList,
                corso:this.props.corsoList,  
                selectedRuolo:0,
                selectedCorso:0,
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
	getCat(evt){
		console.log(evt.target.value);
		this.setState({
			selectedCat:parseInt(evt.target.value),
		})
	}
    
	getRuolo(evt){
		console.log(evt.target.value);
		this.setState({
            selectedRuolo:parseInt(evt.target.value)
		})
	}
    
	getCorso(evt){
		console.log(evt.target.value);
		this.setState({
            selectedCorso:parseInt(evt.target.value)
		})
	}   
    resetForm(){
		console.log('reset');
		console.log(this.state);
		this.setState({
                newUser:{},     
                ruolo:this.props.ruoloList,
                corso:this.props.corsoList,  
                selectedRuolo:0,
                selectedCorso:0,
                utente:'',
                email:'',
                password:'',
                prs:'',
                image:{},
                privacyCheck:false
		});
	}
	render(){
    
        const ruoloList=this.state.ruolo.map((e,i) =>{
			return(
				<option value={e._id} key={e._id} onChange={this.getCat.bind(this)}>{e.name}</option>
			)
		});

        const corsoList=this.state.corso.map((e,i) =>{
			return(
				<option value={e._id} key={e._id} onChange={this.getCorso.bind(this)}>{e.name}</option>
			)
		});
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
                                    <select value={this.state.selectedCorso} onChange={this.getCorso.bind(this)}>
                                    <option value="0">Scegli il tuo corso</option>
                                    {corsoList}
                                    </select>
                                    <label>Corso</label>
                                </div>
                                    
                               <div className="mui-select">
                                    <select value={this.state.selectedRuolo} onChange={this.getRuolo.bind(this)}>
                                    <option value="0">Scegli ruolo</option>
                                    {ruoloList}
                                    </select>
                                    <label>Ruolo</label>
                                </div>                                    

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="email" type="email" value={this.state.email} onChange={this.writing.bind(this)} />
                                    <label>Email</label> 
                                </div>

                                <div className="mui-textfield mui-textfield--float-label">
                                    <input name="password" type="password" value={this.state.password} onChange={this.writing.bind(this)} />
                                    <label>Password</label>
                                </div>
    
                                <div className='mui-checkbox'>
                                    <label>Termini e condizioni</label><br/>
                                    <input type="checkbox" checked={this.state.privacyCheck} onChange={this.checkPrivacy.bind(this)}/><span> Accetto i <a href="#">Termini per il trattamento della privacy</a></span>
                                </div>
                                
                                <div className="mui-form-group">
                                    <button type="button" onClick={this.resetForm.bind(this)} 
                                    className="mui-btn mui-btn--danger">Annulla</button>
                                    <button type="submit" className="mui-btn">Registrati</button>
                                </div>
                        </form>
                    </div>
                    </div>
                </div>
			</section>
        )
    }    
}