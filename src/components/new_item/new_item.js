'use strict';
import React from 'react';
import Spinner from './../common/spinner';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';
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
	checkType(evt){
		console.log(evt.target.value);
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
		Backend.upLoadMedia(file)
		.then((data)=>{
			console.log('id:'+data.id);
			if(data.id==undefined){
				data.id=0;
			}
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
		if(error==0){
			if(this.state.media_id!=0||this.state.media_id!=undefined){
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
					console.log(data);
						if(data.status=='publish'){
							console.log('Annuncio pubblicato');
						}
					}).then(()=>{
						this.props.goToPage('List');
					});
			}else{
				console.log('uploading image..')
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
			type:5
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
    <section className="background-add-annuncio">
          <div className="mui-container">
            <div className="mui-row">
              <div className="mui-col-xs-12">
                <form onSubmit={this.submitAnnuncio.bind(this)} className="mui-form">
                <div className={this.state.ClassNameCategory}>
                  <div className="mui-select">
                    <select onChange={this.checkType.bind(this)}>
                      <option name="tipologia" aria-label="" value="3" >Cerco</option>
                      <option name="tipologia" aria-label="" value="5" >Offro</option>
                    </select>
                    <label>Tipologia dell annuncio</label>
                  </div>
                  <div className="mui-select">
                    <select name="" id="ann_category" value={this.state.selectedCat} onChange={this.getCat.bind(this)}>
                    <option value="0">Seleziona categoria</option>
                        {catList}
                    </select>
                    <label>Categoria</label>
                  </div>
                  <div className={this.state.ClassNameTitle}>
                     <input type="text" placeholder="Titolo" value={this.state.title} onChange={this.writing.bind(this)} name="title" />
                     <label>Titolo annuncio</label>
                   </div>
                   <div className={this.state.ClassNameText}>
                     <textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={this.writing.bind(this)} name="text"></textarea>
                     <label>Descrizione</label>
                   </div>
                </div>

                <span className="span-img">Aggiungi una foto</span>
				
                <input onChange={this.uploadFile.bind(this)} type="file" name="file" id="add-img" className="inputfile" />
                <label htmlFor="add-img" className="input-add-img"><Imgblock mediaId={this.state.media_id}/><i className="ion-images"></i></label>
                <button type="submit" className="my-button mui-col-xs-12 mui-btn mui-btn--primary">AGGIUNGI ANNUNCIO</button>
                <button onClick={this.resetForm.bind(this)} type="button" className="my-button mui-col-xs-12 mui-btn mui-btn--danger">ANNULLA</button>
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
