'use strict';

class WAT_Backend {

  constructor(){
    //se avessimo creato una variabile sarebbe stata disponibile solo all'interno del costruttore.
    //Usando this diventa una proprietà della classe, accessibile anche dall'esterno
    this.url = '';
  }

//underscore davanti è una convenzione per dire che voglio usare questo metodo solo internamente
  _parseRaw(reponse){
    return response.json();
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



  isAuthor(userId){
    if(userId===this.props.authorId){
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


  getMovies(){
    return fetch(`${this.url}/movies`)
      .then(this._parseRaw);
  }

  getSingleMovie(id){
    return fetch(`${this.url}/movie/${id}`)
      .then(this._parseRaw);
  }

//di default fetch fa una chiamata get, altrimenti va specificato tramite un oggetto (secondo argomento della funzione fetch)
  postMovie(obj){
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      body: JSON.stringify(obj)
    }).then(this._parseRaw);
  }

  editMovie(id,data){
    return fetch(`${this.url}/movie/${id}`,{
      method: 'PUT',
      body: JSON.stringify(obj)
    }).then(this._parseRaw);
  }

}

export const Backend = new WAT_Backend();
