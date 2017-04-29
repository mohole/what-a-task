'use strict';

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
}
export const Backend = new WAT_Backend;