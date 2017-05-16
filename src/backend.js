'use strict';

class WAT_Backend{
    constructor(){
        this.url = 'http://moholepeople.it/whatatask/wp-json/wp/v2',
        this.headers={
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }
    }
    _parseRaw(response){
        return response.json();
    }

    checkAuth(){
        return fetch(`${this.url}/settings`,{
          headers: this.headers
        }).then(this._parseRaw)
    }
    setCredentials(user,pswd){
        const encoded = btoa(user + ':' + pswd);
        const auth ={Authorization:`Basic ${encoded}`};
        this.headers = Object.assign({},this.headers,auth);
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
  	getAnnuncio(postId){
  		return fetch(`${this.url}/annunci/${postId}`)
          .then(this._parseRaw)
  	}
    getCurrentCategoryName(cat){
  		return fetch(`${this.url}/tags/${cat}`)
          .then(this._parseRaw)
    }
    getUserInfo(userId){
  		return fetch(`${this.url}/users/${userId}`)
          .then(this._parseRaw)
    }
}
export const Backend = new WAT_Backend;
