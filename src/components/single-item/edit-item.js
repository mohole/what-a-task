'use strict';
import React from 'react';
import {Backend} from './../../backend';

export default class EditItem extends React.Component{
    constructor(props){
        super(props);
        console.log('edit item ready');

        this.state={
          id:this.props.id,
          text:this.props.text,
          title:this.props.title,
          image:this.props.image,
          imageUrl:this.props.imageUrl,
          type:this.props.type,
          cat:this.props.categoryList,
          selectedCat: this.props.selectedCat[0],
          privacyCheck:false,
          ClassNameTitle:'form-group mui-textfield',
          ClassNameText:'form-group mui-textfield',
          ClassNamePrivacy:'form-group mui-checkbox',
          ClassNameCategory:'form-group mui-select'
        }
    }

    writing(evt){
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
    	const input = evt.target.value;
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
    /*
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
*/

	uploadFile(evt){
		const file=evt.target.files[0];
		console.log(file);
		Backend.upLoadMedia(file)
        .then((data)=>{
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
    			ClassNameTitle:'form-group error mui-textfield'
    		})
    		error++;
    	}else{
    		this.setState({
    			ClassNameTitle:'form-group success'
    		})
    	}
    	if(this.state.text===''||this.state.text.length<5){
    		this.setState({
    			ClassNameText:'form-group error mui-textfield'
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
    			ClassNamePrivacy:'form-group error mui-checkbox'
    		})
    		error++;
    	}else{
    		this.setState({
    			ClassNamePrivacy:'form-group success mui-checkbox'
    		})
    	}
    	if(error==0){

                if(this.state.media_id!=0||this.state.media_id!=undefined){
                    console.log('ok tutto giusto');
                    const updatedItem = {
                        title:this.state.title,
                        tags:this.state.selectedCat,
                        content:this.state.text,
                        categories:this.state.type,
                        featured_media:this.state.media_id,
                        status: 'publish'
                    }
                    Backend.updateAnnuncio(this.state.id,updatedItem)
                        .then((data)=>{
                        console.log(data);
                            if(data.status=='publish'){
                                console.log('Annuncio pubblicato');
                            }
                        }).then(()=>{
                            this.props.undo();
                        });
                }else{
                    console.log('uploading image..')
                }
    	}
    }

    deleteThis(){
        if (confirm('Sei sicuro di voler eliminare l\'annuncio?')) {
            Backend.deleteAnnuncio(this.state.id)
            .then(()=>{
                console.log('DELETED');
                this.props.goToPage('List');
            })
        }
    }

     resetEditForm(){
        console.log('reset');
        this.setState({
          type:this.props.type,
          text:this.props.text,
          title:this.props.title,
          image:this.props.image,
          type:this.props.type,
          selectedCat: this.props.selectedCat,
          privacyCheck:this.state.privacyCheck,
          ClassNameTitle:'form-group mui-textfield',
          ClassNameText:'form-group mui-textfield',
          ClassNamePrivacy:'form-group mui-checkbox',
          ClassNameCategory:'form-group mui-select'
        });
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
		if(this.state.cat.length!=0){
		const catList =this.state.cat.map((e,i) =>{
			return(
				<option value={e.id} key={e.id}>{e.name}</option>
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
						<form action="#" encType="multipart/form-data" method="POST" onSubmit={this.submitAnnuncio.bind(this)} className="mui-form">
    						<div className={this.state.ClassNameCategory}>
        						<label htmlFor="">Categoria</label>
                                <select name="" id="ann_category" className="form-control" value={this.state.selectedCat} onChange={this.getCat.bind(this)}>
                                {catList}
                                </select>
    					    </div>
							<div className="mui-radio">
								<label htmlFor="">Tipologia</label><br/>
								<input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type==5} value="5"/> <span>Offro</span> <input type="radio" name="tipologia" aria-label="" onChange={this.checkType.bind(this)} checked={this.state.type==3} value="3"/> <span>Cerco</span>
							</div>
                            <div>
                                <img src={this.state.imageUrl} alt=""/>
                            </div>
							<div className="mui-textfield">
								<label htmlFor="">Immagine</label><br/>
								<input type="file" placeholder="Immagine" onChange={this.uploadFile.bind(this)}/>
							</div>
							<div className={this.state.ClassNameTitle+" mui-textfield"}>
								<label htmlFor="">Titolo annuncio</label>
								<input type="text" className="form-control" placeholder="Titolo" value={this.state.title} onChange={this.writing.bind(this)} name="title"/>
							</div>
							<div className={this.state.ClassNameText+" mui-textfield"}>
								<label htmlFor="">Testo annuncio</label>
								<textarea name="" id="" cols="30" rows="10" className="form-control" value={this.state.text} onChange={this.writing.bind(this)} name="text"></textarea>
							</div>
							<div className={this.state.ClassNamePrivacy}>
								<label htmlFor="">Termini e condizioni</label><br/>
								<input type="checkbox" checked={this.state.privacyCheck} onChange={this.checkPrivacy.bind(this)}/><span>Accetto i <a href="#">termini della privacy</a></span>
							</div>
							<div className="form-group">
								<button type="submit" className="mui-btn mui-btn--primary">Salva</button>
								<button type="button" onClick={this.resetEditForm.bind(this)}  className="mui-btn mui-btn--danger">Pulisci</button>
								<button type="button" onClick={this.props.undo} className="mui-btn mui-btn--danger">Annulla</button>
								<button type="button" onClick={()=>{this.deleteThis()}} className="mui-btn mui-btn--danger">Elimina Annuncio</button>
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
