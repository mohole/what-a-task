'use strict';
import React from 'react';
import {Backend} from './../../backend';

export default class EditItem extends React.Component{
    constructor(props){
        super(props);
        console.log('edit item ready');

        this.state={
          type:this.props.type,
          text:this.props.text,
          title:this.props.title,
          image:this.props.image,
          type:this.props.type,
          privacyCheck:this.props.privacyCheck,
          selectedCat: this.props.selectedCat,
          ClassNameTitle:this.props.ClassNameTitle,
          ClassNameText:this.props.ClassNameText,
          ClassNamePrivacy:this.props.ClassNamePrivacy,
          ClassNameCategory:this.props.ClassNameCategory
        }
    }
/*

nell'<input/>:
  onClick={this.postEditedItem.bind(this)}

postEditedItem(){
  //create object following WP parameters,

  //then:
  fetch('https://mywebsite.com/endpoint/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type:this.state.type,
      text:this.state.text,
      title:this.state.title,
      image:this.state.image,
      type:this.state.type,
      privacyCheck:this.state.privacyCheck,
      selectedCat: this.state.selectedCat,
      ClassNameTitle:this.state.ClassNameTitle,
      ClassNameText:this.state.ClassNameText,
      ClassNamePrivacy:this.state.ClassNamePrivacy,
      ClassNameCategory:this.state.ClassNameCategory
    })
  });
}*/


	render(){
		const catList =this.props.cat.map((e,i) =>{
			return(
				<option value={e._id} key={e._id} onChange={Backend.getCat.bind(this)}>{e.name}</option>
			)
		});

        return(
            <section>
			<div className="mui-container content">
				<div className="mui-row">
					<div className="mui-col-xs-12">
						<h1>Modifica annuncio</h1>
					</div>
					<div className="mui-col-xs-12">
						<form action="#" encType="multipart/form-data" method="POST" onSubmit={Backend.submitAnnuncio.bind(this)} className="mui-form">
						<div className={this.state.ClassNameCategory}>
						<label htmlFor="">Categoria</label>
            <select name="" id="ann_category" className="form-control" value={this.state.selectedCat} onChange={Backend.getCat.bind(this)}>
            <option value="0">Categoria</option>
            {catList}
            </select>
						</div>
							<div className="mui-radio">
								<label htmlFor="">Tipologia</label><br/>
								<input type="radio" name="tipologia" aria-label="" onChange={Backend.checkType.bind(this)} checked={this.state.type==='offro'} value="offro"/> <span>Offro</span> <input type="radio" name="tipologia" aria-label="" onChange={Backend.checkType.bind(this)} checked={this.state.type==='cerco'} value="cerco"/> <span>Cerco</span>
							</div>
							<div className="mui-textfield">
								<label htmlFor="">Immagine</label><br/>
								<input type="file" placeholder="Immagine" onChange={Backend.uploadFile.bind(this)}/>
							</div>
							<div className={this.state.ClassNameTitle+" mui-textfield"}>
								<label htmlFor="">Titolo annuncio</label>
								<input type="text" className="form-control" placeholder="Titolo" value={this.state.title} onChange={Backend.writing.bind(this)} name="title"/>
							</div>
							<div className={this.state.ClassNameText+" mui-textfield"}>
								<label htmlFor="">Testo annuncio</label>
								<textarea name="" id="" cols="30" rows="10" className="form-control" value={this.state.text} onChange={Backend.writing.bind(this)} name="text"></textarea>
							</div>
							<div className={this.state.ClassNamePrivacy}>
								<label htmlFor="">Termini e condizioni</label><br/>
								<input type="checkbox" checked={this.state.privacyCheck} onChange={Backend.checkPrivacy.bind(this)}/><span>Accetto i <a href="#">termini della privacy</a></span>
							</div>
							<div className="form-group">
								<button type="submit" className="mui-btn mui-btn--primary">Inserisci</button>
								<button type="button" onClick={Backend.resetEditForm.bind(this)}  className="mui-btn mui-btn--danger">Annulla</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</section>
        )
    }
}
