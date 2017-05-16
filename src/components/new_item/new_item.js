'use strict';
import React from 'react';
import Spinner from './../common/spinner';
import {Backend} from './../../backend';
export default class NewItem extends React.Component{
    constructor(props){
        super(props);
        console.log('new item ready');
		this.state ={
			title:'',
			text:'',
			media_id:0,
			cat:this.props.categoryList,
			ClassNameTitle:'mui-textfield',
			ClassNameText:'mui-textfield',
			ClassNamePrivacy:'mui-checkbox',
			ClassNameCategory:'mui-select',
			selectedCat:0,
			type:5, /*5=offro,3=cerco*/
			privacyCheck:false,
        }
	}
	
	writing(evt){
        console.log('sto scrivendo');
        const input = evt.target.value;
		const elem=evt.target.getAttribute('name');
        this.setState({
            [elem] : input
        });
    }
	checkPrivacy(evt){
		console.log(!this.state.privacyCheck);
        this.setState({
            privacyCheck : !this.state.privacyCheck
        });
    }
	checkType(evt){
		const input = parseInt(evt.target.value);
		this.setState({
            type : input
        });
	}
	getCat(evt){
		console.log(evt.target.value);
		this.setState({
			selectedCat:parseInt(evt.target.value)
		})
	}
	uploadFile(evt){
		const file=evt.target.files[0];
		console.log(file);
		Backend.upLoadMedia(file).then((data)=>{
			console.log('id:'+data.id);
					this.setState({
						media_id:data.id
					})
				})

	}
	
	submitAnnuncio(evt){
		evt.preventDefault();
		var error=0;
		if(this.state.title===''||this.state.title.length<3){
			this.setState({
				ClassNameTitle:'mui-textfield error'
			})
			error++;
		}else{
			this.setState({
				ClassNameTitle:'mui-textfield success'
			})
		}
		if(this.state.text===''||this.state.text.length<5){
			this.setState({
				ClassNameText:'mui-textfield error'
			})
			error++;
		}else{
			this.setState({
				ClassNameText:'mui-textfield success'
			})
		}
		if(this.state.selectedCat==0){
			this.setState({
				ClassNameCategory:'mui-select error'
			})
			error++;
		}else{
			this.setState({
				ClassNameCategory:'mui-select success'
			})
		}
		if(this.state.privacyCheck==false){
			this.setState({
				ClassNamePrivacy:'mui-checkbox error'
			})
			error++;
		}else{
			this.setState({
				ClassNamePrivacy:'mui-checkbox success'
			})
		}
		if(error==0){
			if(this.state.media_id!=0){
				console.log('ok tutto giusto');
				const newItem = {
					title:this.state.title,
					tags:this.state.selectedCat,
					content:this.state.text,
					categories:this.state.type,
					featured_media:this.state.media_id,
					status: 'publish'
				}
				Backend.postAnnuncio(newItem)
					.then((data)=>{
						if(data.status=='publish'){
							console.log('Annuncio pubblicato');
						}
					}).then(()=>{
						this.props.goToPage('List');
					});
			}
		}
	}
	resetForm(){
		this.setState({
			title:'',
			text:'',
			media_id:null,
			cat:this.props.categoryList,
			ClassNameTitle:'mui-textfield',
			ClassNameText:'mui-textfield',
			ClassNamePrivacy:'mui-checkbox',
			ClassNameCategory:'mui-select',
			selectedCat:0,
			type:5,
			privacyCheck:false,
		});
	}
	render(){
		
		if(this.state.cat.length!=0){
		const catList =this.state.cat.map((e,i) =>{
			return(
				<option value={e.id} key={e.id} onChange={this.getCat.bind(this)}>{e.name}</option>
			)
		});
							
        return(
            <section>
			<div className="mui-container content">
				<div className="mui-row">
					<div className="mui-col-xs-12">
						<h1>Inserisci annuncio</h1>
					</div>
					<div className="mui-col-xs-12">
						<form action="#" onSubmit={this.submitAnnuncio.bind(this)} className="mui-form">
						<div className={this.state.ClassNameCategory}>
						<label htmlFor="">Categoria</label>
							<select name="" id="ann_category" value={this.state.selectedCat} onChange={this.getCat.bind(this)}>
							<option value="0">Categoria</option>
							{catList}
							</select>
						</div>
							<div className="mui-radio">
								<label htmlFor="">Tipologia</label><br/>
								<input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type===5} value="5"/> <span>Offro</span> <input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type===3} value="3"/> <span>Cerco</span>
							</div>
							<div className="mui-textfield">
								<label htmlFor="">Immagine</label><br/>
								<input type="file" placeholder="Immagine" onChange={this.uploadFile.bind(this)}/>
							</div>
							<div className={this.state.ClassNameTitle}>
								<label htmlFor="">Titolo annuncio</label>
								<input type="text" placeholder="Titolo" value={this.state.title} onChange={this.writing.bind(this)} name="title"/>
							</div>
							<div className={this.state.ClassNameText}>
								<label htmlFor="">Testo annuncio</label>
								<textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={this.writing.bind(this)} name="text"></textarea>
							</div>
							<div className={this.state.ClassNamePrivacy}>
								<label htmlFor="">Termini e condizioni</label><br/>
								<input type="checkbox" checked={this.state.privacyCheck} onChange={this.checkPrivacy.bind(this)}/><span>Accetto i <a href="#">termini della privacy</a></span>
							</div>
							<div className="mui-textfield">
								<button type="submit" className="mui-btn mui-btn--primary">Inserisci</button>
								<button type="button" onClick={this.resetForm.bind(this)} className="mui-btn mui-btn--danger">Annulla</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</section>
        )
		}else{
			return(
				<Spinner/>
			)
		}
    }
}