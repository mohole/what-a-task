'use strict';
import React from 'react';

class WAT_Backend{
    constructor(){
        this.url = 'http://localhost/whatatask/wp-json/wp/v2';
    }
    _parseRaw(response){
        return response.json();
    }
	getCategory(){
        return fetch(`${this.url}/tags`)
        .then(this._parseRaw)
    }
	postAnnuncio(annuncio){
        return fetch(`${this.url}/annunci`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(annuncio)
        })
        .then(this._parseRaw);
    }
  	getAnnunci(){
  		return fetch(`${this.url}/annunci`)
          .then(this._parseRaw)
  	}
  /*front-end single-item*/
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
  			console.log('ok');
  		}
  	}



  isAuthor(userId, authorId){
    if(userId===authorId){
      return <a href="#" className="float-xs-right"><span className="glyphicon glyphicon-pencil"></span>MODIFICA</a>;
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
      privacyCheck:this.props.privacyCheck,
      selectedCat: this.props.selectedCat,
      ClassNameTitle:this.props.ClassNameTitle,
      ClassNameText:this.props.ClassNameText,
      ClassNamePrivacy:this.props.ClassNamePrivacy,
      ClassNameCategory:this.props.ClassNameCategory
		});
	}
  /*front-end single-item*/
}
export const Backend = new WAT_Backend;