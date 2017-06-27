'use strict';
import React from 'react';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';
export default class EditItem extends React.Component{
    constructor(props){
        super(props);
        console.log('edit item ready');

        this.state={
          id:this.props.id,
          text:this.props.text,
          title:this.props.title,
          media_id:this.props.image,
          imageUrl:this.props.imageUrl,
          type:this.props.type,
          cat:this.props.categoryList,
          selectedCat: this.props.selectedCat[0],
          ClassNameTitle:'mui-textfield',
          ClassNameText:'mui-textfield',
          ClassNameCategory: 'mui-select'
        }
    }

    writing(evt){
        const input = evt.target.value;
    		const elem=evt.target.getAttribute('name');
        this.setState({
            [elem] : input
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
    			ClassNameTitle:'error mui-textfield'
    		})
    		error++;
    	}else{
    		this.setState({
    			ClassNameTitle:'success mui-textfield'
    		})
    	}
    	if(this.state.text===''||this.state.text.length<5){
    		this.setState({
    			ClassNameText:'error mui-textfield'
    		})
    		error++;
    	}else{
    		this.setState({
    			ClassNameText:'success mui-textfield'
    		})
    	}
    	if(this.state.selectedCat==0){
    		this.setState({
    			ClassNameCategory:'error mui-select'
    		})
    		error++;
    	}else{
    		this.setState({
    			ClassNameCategory:'success mui-select'
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
	checkType(evt){
		console.log(evt.target.value);
		const input = parseInt(evt.target.value);
		this.setState({
            type : input
        });
	}
     resetEditForm(){
        console.log('reset');
        this.setState({
          type:this.props.type,
          text:this.props.text,
          title:this.props.title,
          media_id:this.props.image,
          type:this.props.type,
          selectedCat: this.props.selectedCat,
          ClassNameTitle:'mui-textfield',
          ClassNameText:'mui-textfield',
          ClassNameCategory:'mui-select'
        });
      }
	render(){
		if(this.state.cat.length!=0){
		const catList =this.state.cat.map((e,i) =>{
			return(
				<option value={e.id} key={e.id}>{e.name}</option>
			)
		});

        return(
            <section className="background-add-annuncio">
			<div className="mui-container">
				<div className="mui-row">
					<div className="mui-col-xs-12">
						<form action="#" encType="multipart/form-data" method="POST" onSubmit={this.submitAnnuncio.bind(this)} className="mui-form">
    						<div className={this.state.ClassNameCategory}>
        						<label htmlFor="">Categoria</label>
                                <select name="" id="ann_category" value={this.state.selectedCat} onChange={this.getCat.bind(this)}>
                                {catList}
                                </select>
    					    </div>
                            <div className="mui-select">
                                <select onChange={this.checkType.bind(this)}>
                                <option name="tipologia" aria-label="" value="3" >Cerco</option>
                                <option name="tipologia" aria-label="" value="5" >Offro</option>
                                </select>
                                <label>Tipologia dell annuncio</label>
                            </div>
                            <div>
                                <img src={this.state.imageUrl} alt=""/>
                            </div>
                            <span className="span-img">Aggiungi una foto</span>
                            
                            <input type="file" placeholder="Immagine" name="file" className="inputfile" id="add-img" onChange={this.uploadFile.bind(this)}/>
                            <label htmlFor="add-img" className="input-add-img"><Imgblock mediaId={this.state.media_id}/><i className="ion-images"></i></label>
							<div className={this.state.ClassNameTitle}>
								<label htmlFor="">Titolo annuncio</label>
								<input type="text" placeholder="Titolo" value={this.state.title} onChange={this.writing.bind(this)} name="title"/>
							</div>
							<div className={this.state.ClassNameText}>
								<label htmlFor="">Testo annuncio</label>
								<textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={this.writing.bind(this)} name="text"></textarea>
							</div>
							
								<button type="submit" className="my-button mui-col-xs-12 mui-btn mui-btn--primary">Salva</button>
								<button type="button" onClick={this.resetEditForm.bind(this)}  className="my-button mui-col-xs-12 mui-btn mui-btn--danger">Pulisci</button>
								<button type="button" onClick={this.props.undo} className="my-button mui-col-xs-12 mui-btn mui-btn--danger">Annulla</button>
								<button type="button" onClick={()=>{this.deleteThis()}} className="my-button mui-col-xs-12 mui-btn mui-btn--danger">Elimina Annuncio</button>
							
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
