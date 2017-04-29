'use strict';
import React from 'react';
export default class NewItem extends React.Component{
    constructor(props){
        super(props);
        console.log('new item ready');
		this.state ={
            newItem:{},
			title:'',
			text:'',
			image:{},
			cat:this.props.categoryList,
			ClassNameTitle:'form-group',
			ClassNameText:'form-group',
			ClassNamePrivacy:'form-group',
			ClassNameCategory:'form-group',
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
			selectedCat:evt.target.value
		})
	}
	uploadFile(evt){
		console.log(evt.target.files);
		const file=evt.target.files[0];
		console.log(file.size);
		var formData = new FormData();
      	formData.append('image',  file, file.name);
		this.setState({
            image : formData
        });
		console.log(formData);
	}
	
	submitAnnuncio(evt){
		evt.preventDefault();
		var error=0;
		if(this.state.title===''||this.state.title.length<3){
			this.setState({
				ClassNameTitle:'form-group error'
			})
			error++;
		}else{
			this.setState({
				ClassNameTitle:'form-group success'
			})
		}
		if(this.state.text===''||this.state.text.length<5){
			this.setState({
				ClassNameText:'form-group error'
			})
			error++;
		}else{
			this.setState({
				ClassNameText:'form-group success'
			})
		}
		if(this.state.selectedCat==0){
			this.setState({
				ClassNameCategory:'form-group error'
			})
			error++;
		}else{
			this.setState({
				ClassNameCategory:'form-group success'
			})
		}
		if(this.state.privacyCheck==false){
			this.setState({
				ClassNamePrivacy:'form-group error'
			})
			error++;
		}else{
			this.setState({
				ClassNamePrivacy:'form-group success'
			})
		}
		if(error==0){
			console.log('ok tutto giusto');
			const newItem = {
				title:this.state.title,
				tags:[this.state.selectedCat],
				content:this.state.text,
				categories:[this.state.type],
				acf: {
					url_img: ''
				},
				author:1 //utente loggato
			}
			this.setState({
				newItem:newItem
			});
			this.props.postAnnuncio(newItem);
		}
	}
	resetForm(){
		console.log('reset');
		console.log(this.state);
		this.setState({
			newItem:{},
			title:'',
			text:'',
			image:{},
			ClassNameTitle:'form-group',
			ClassNameText:'form-group',
			ClassNamePrivacy:'form-group',
			ClassNameCategory:'form-group',
			selectedCat:0,
			type:5,
			privacyCheck:false
		});
	}
	render(){
		
		if(this.state.cat.lenght!=0){
		const catList =this.state.cat.map((e,i) =>{
			return(
				<option value={e.id} key={e.id} onChange={this.getCat.bind(this)}>{e.name}</option>
			)
		});
							
        return(
            <section>
			<div className="container content">
				<div className="row">
					<div className="col-xs-12">
						<h1>Inserisci annuncio</h1>
					</div>
					<div className="col-xs-12">
						<form action="#" onSubmit={this.submitAnnuncio.bind(this)}>
						<div className={this.state.ClassNameCategory}>
						<label htmlFor="">Categoria</label>
							<select name="" id="ann_category" className="form-control" value={this.state.selectedCat} onChange={this.getCat.bind(this)}>
							<option value="0">Categoria</option>
							{catList}
							</select>
						</div>
							<div className="form-group">
								<label htmlFor="">Tipologia</label><br/>
								<input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type===5} value="5"/> <span>Offro</span> <input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type===3} value="3"/> <span>Cerco</span>
							</div>
							<div className="form-group">
								<label htmlFor="">Immagine</label><br/>
								<input type="file" placeholder="Immagine" onChange={this.uploadFile.bind(this)}/>
							</div>
							<div className={this.state.ClassNameTitle}>
								<label htmlFor="">Titolo annuncio</label>
								<input type="text" className="form-control" placeholder="Titolo" value={this.state.title} onChange={this.writing.bind(this)} name="title"/>
							</div>
							<div className={this.state.ClassNameText}>
								<label htmlFor="">Testo annuncio</label>
								<textarea name="" id="" cols="30" rows="10" className="form-control" value={this.state.text} onChange={this.writing.bind(this)} name="text"></textarea>
							</div>
							<div className={this.state.ClassNamePrivacy}>
								<label htmlFor="">Termini e condizioni</label><br/>
								<input type="checkbox" checked={this.state.privacyCheck} onChange={this.checkPrivacy.bind(this)}/><span>Accetto i <a href="#">termini della privacy</a></span>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-block btn-success">Inserisci</button>
								<button type="button" onClick={this.resetForm.bind(this)} className="btn btn-block btn-danger">Annulla</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</section>
        )
		}else{
			return(
				<section>NO</section>
			)
		}
    }
}