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
		this.auth= `Basic ${encoded}`;
    }

	getCategory(){
        return fetch(`${this.url}/tags`)
        .then(this._parseRaw)
    }
	postAnnuncio(annuncio){
		
        return fetch(`${this.url}/annunci`,
        {
            headers:  this.headers,
            method: "POST",
            body: JSON.stringify(annuncio)
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
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				if (typeof callback == "function") {
					callback.apply(xhr);
				}	
			}
		});
		xhr.open("POST", `${this.url}/media`);
		xhr.setRequestHeader("Authorization", this.auth);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send(data);
	}
}
export const Backend = new WAT_Backend;
