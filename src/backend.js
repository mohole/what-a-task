'use strict';

class WAT_Backend{
    constructor(){
        this.url = 'http://backend.mohole.it/whatatask/wp-json/wp/v2',
        this.headers={
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }
		const tok = window.localStorage.getItem('token');
		this.auth= `Basic ${tok}`;
		const auth ={Authorization:`Basic ${tok}`};
        this.headers = Object.assign({},this.headers,auth);
    }
    _parseRaw(response){
        return response.json();
    }

    checkAuth(){
        return fetch(`${this.url}/users/me`,{
          headers: this.headers
        }).then(this._parseRaw)
    }
    setCredentials(user,pswd){
        const encoded = btoa(user + ':' + pswd);
		console.log('tok');
        const auth ={Authorization:`Basic ${encoded}`};
        this.headers = Object.assign({},this.headers,auth);
		this.auth= `Basic ${encoded}`;
    }

	getCategory(){
        return fetch(`${this.url}/tags`)
        .then(this._parseRaw)
    }

	postAnnuncio(annuncio){
		const data=JSON.stringify(annuncio);
        return fetch(`${this.url}/annunci`,
        {
            headers:  this.headers,
            method: "POST",
            body: data
        })
        .then(this._parseRaw);
    }
	updateAnnuncio(id,annuncio){
        return fetch(`${this.url}/annunci/${id}`,
        {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(annuncio)
        })
        .then(this._parseRaw);
    }


	deleteAnnuncio(id){
        const del={
            "status":"draft"
        };
        return fetch(`${this.url}/annunci/${id}`,
        {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(del)
        })
        .then(this._parseRaw);
    }

	updateProfile(id,updatedInfo){
        return fetch(`${this.url}/users/${id}`,
        {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(updatedInfo)
        })
        .then(this._parseRaw);
    }
  	getAnnunci(){
  		return fetch(`${this.url}/annunci`)
          .then(this._parseRaw)
  	}
	upLoadMedia(imgPath,callback){
		var data = new FormData();
		data.append("file", imgPath);
		return fetch(`${this.url}/media`,
        {
            headers:{
				Authorization: this.auth,
				'Accept': 'application/json',
			},
            method: "POST",
            body: data
        })
        .then(this._parseRaw);
	}
	searchAnnuncio(searchTerm,cat,tag){
		var searchString ='?';
		if(searchTerm!=null){
			searchString+='search='+searchTerm;
		}
		if(cat!=null){
			if(searchString!='?'){
				searchString+='&'
			}
			searchString+='categories='+cat
		}
		if(tag!=null){
			if(searchString!='?'){
				searchString+='&'
			}
			searchString+='tags='+tag
		}
		if(searchString=='?'){
			searchString='';
		}
		console.log(searchString);
		return fetch(`${this.url}/annunci${searchString}`)
          .then(this._parseRaw)
	}
    searchUser(searchTerm){
        console.log(searchTerm);
        return fetch(`${this.url}/users/?search=${searchTerm}`)
            .then(this._parseRaw)
    }
  	getAnnuncio(postId){
  		return fetch(`${this.url}/annunci/${postId}`)
          .then(this._parseRaw)
  	}
    getCurrentCategoryName(cat){
  		return fetch(`${this.url}/tags/${cat}`)
          .then(this._parseRaw)
    }
    getUserInfo(userId){
  		return fetch(`${this.url}/users/${userId}`,
    		{
                headers: this.headers,
                method: "GET"
            })
          .then(this._parseRaw)
    }
	getMe(){
		return fetch(`${this.url}/users/me`,
		{
            headers: this.headers,
            method: "POST"
        })
        .then(this._parseRaw)
	}
	getMedia(mediaId){
		return fetch(`${this.url}/media/${mediaId}`)
          .then(this._parseRaw)
	}
}
export const Backend = new WAT_Backend;
